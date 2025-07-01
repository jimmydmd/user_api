  import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { InjectModel } from '@nestjs/mongoose';
  import { User } from './schemas/user.schemas';
  import { isValidObjectId, Model } from 'mongoose';
  import { HttpService } from '@nestjs/axios';
  import { firstValueFrom } from 'rxjs';

  @Injectable()
  export class UsersService implements OnModuleInit {
    constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      private readonly httpService: HttpService,
    ) {}

    async create(createUserDto: CreateUserDto) {
      createUserDto.name = createUserDto.name.toLowerCase();

      try {
        const user = await this.userModel.create( createUserDto );
        return {
          name: user.name,
          city: user.address?.city,
          company: user.company?.name,
        };

      } catch (error) {
        this.handleExepcions(error);
      }
    }

    async findAll() {
      const users = await this.userModel.find();

      const formattedUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        city: user.address?.city,
        company: user.company?.name,
      }));

      return {
        totalUsers: formattedUsers.length,
        users: formattedUsers,
      };
    }
    
    async findOne(id: string) {

      if (!isValidObjectId(id)) {
        throw new BadRequestException(`${id} is not a valid MongoID`);
      }
      
      const user = await this.userModel.findById( id );
      
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return {
          id: user._id,
          name: user.name,
          city: user.address.city,
          company: user.company.name,
      }

    }

    async update(id: string, updateUserDto: UpdateUserDto) {
      if (!isValidObjectId(id)) {
        throw new BadRequestException(`${id} is not a valid MongoID`);
      }

      const user = await this.userModel.findById(id);
      
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      if ( updateUserDto?.name ) {
        updateUserDto.name = updateUserDto.name.toLowerCase();
      }

      try {
        await user.updateOne( updateUserDto, { new: true } );
        return { ...user.toJSON(), ...updateUserDto };

      } catch (error) {
        this.handleExepcions(error);
      }
    }

    async remove(id: string) {

      const deletedUser = await this.userModel.findByIdAndDelete(id);

      if (!deletedUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return {
        message: `User with id ${id} was deleted`,
        id: deletedUser._id,
        name: deletedUser.name,
      };

    }

    /**
     * Initialize the database by inserting data from the API if it's empty.
    */
    async onModuleInit() {
      const count = await this.userModel.countDocuments();
      
      console.log("Count of users",count);

      if (count === 0) {
        const response = await firstValueFrom(
          this.httpService.get(process.env.API_URL || 'https://jsonplaceholder.typicode.com/users'),
        );
        await this.userModel.insertMany(response.data);
      }
      
    }


   /**
   * Searches for users based on the provided filter criteria and returns a list of matched users.
   * 
   * @param params - An object containing optional search parameters:
   *   @param name - (Optional) The name of the user to search for. Supports partial matching.
   *   @param city - (Optional) The city of the user to search for. Supports partial matching.
   *   @param company - (Optional) The company name of the user to search for. Supports partial matching.
   *   @param sortBy - (Optional) The field by which to sort the results. Defaults to 'name'.
   * 
   * @returns An object containing:
   *   - totalUsers: The total number of users found.
   *   - users: An array of user objects with id, name, city, and company properties.
   */

  async searchUsers(params: {
      name?: string;
      city?: string;
      company?: string;
      sortBy?: string;
    }) {
    const { name, city, company, sortBy } = params;

    const filters: any = {};

    if (name) filters.name = { $regex: name, $options: 'i' };
    if (city) filters['address.city'] = { $regex: city, $options: 'i' };
    if (company) filters['company.name'] = { $regex: company, $options: 'i' };

    const users = await this.userModel
      .find(filters)
      .collation({ locale: 'en', strength: 1 }) 
      .sort({ [sortBy || 'name']: 1 });

    return {
      totalUsers: users.length,
      users: users.map(u => ({
        id: u.id,
        name: u.name,
        city: u.address.city,
        company: u.company.name,
      })),
    };
  }

  /**
   * Handle exceptions thrown by the model. If it's a validation error, throw a
   * BadRequestException with the error message. If it's a duplicate key error,
   * throw a BadRequestException with a message indicating that the user already
   * exists in the database. Otherwise, log the error and throw an
   * InternalServerErrorException.
   */
    private handleExepcions (error: any){

    if (error.name === 'ValidationError') {
      throw new BadRequestException(error.message);
    }
    
    if ( error.code === 11000 ) {
        throw new BadRequestException(`User exists in db ${ JSON.stringify( error.keyValue ) }`)
      }
      console.log(error);
      throw new InternalServerErrorException('Can ́t create User - Check server logs');
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';


@ApiTags('Users')
@Controller('users')
// @UsePipes( ValidationPipe )
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode( 201 )
  @ApiCreatedResponse({ description: 'User created successfully' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('search')
  search(
    @Query('name') name?: string,
    @Query('city') city?: string,
    @Query('company') company?: string,
    @Query('sortBy') sortBy?: string,
  ) {
    return this.usersService.searchUsers({ name, city, company, sortBy });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }


}

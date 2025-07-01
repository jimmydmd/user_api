import { IsString, IsNotEmpty, ValidateNested, IsEmail, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


class AddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;
}

class CompanyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;


  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CompanyDto)
  company: CompanyDto;
}

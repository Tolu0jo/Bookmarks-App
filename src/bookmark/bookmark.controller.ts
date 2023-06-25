import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark-dto';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { EditBookmarkDto } from './dto';

@Controller('bookmarks')
@UseGuards(JwtGuard)
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}

  //==================Crate Bookmark =================//
  @Post()
  createBookmark(
    @GetUser('id') userId: string,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(
      userId,
      dto,
    );
  }

  //===============Get Bookmarks by user =============//
  @Get()
  getBookmarks(@GetUser('id') userId: string) {
    return this.bookmarkService.getBookmarks(userId);
  }

  //============GetBookmarksbyid=============//
  @Get(':id')
  getBookmarksById(
    @GetUser('id') userId: string, //decorator to get the looged in user
    @Param('id') bookmarkId: string,
  ) {
    return this.bookmarkService.getBookmarksById(
      userId,
      bookmarkId,
    );
  } 

  //=================EditBookmark===============//
  @Patch(':id')
  editBookmarkById(
    @GetUser('id') userId: string,
    @Body() dto: EditBookmarkDto,
    @Param('id') bookmarkId: string,
  ) {
    return this.bookmarkService.editBookmarkById(
      userId,
      dto,
      bookmarkId,
    );
  } 

  //=========DeleteBookmark===========//
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: string,
    @Param('id',) bookmarkId: string,
  ) {
    return this.bookmarkService.deleteBookmarkById(
      userId,
      bookmarkId,
    );
  }
}

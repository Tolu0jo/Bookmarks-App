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
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(
      userId,
      dto,
    );
  }

  //===============Get Bookmarks by user =============//
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId);
  }

  //============GetBookmarksbyid=============//
  @Get(':id')
  getBookmarksById(
    @GetUser('id') userId: number, //decorator to get the looged in user
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarksById(
      userId,
      bookmarkId,
    );
  } //parseIntpipe id used to convert the params to number cos params are strings

  //=================EditBookmark===============//
  @Patch(':id')
  editBookmarkById(
    @GetUser('id') userId: number,
    @Body() dto: EditBookmarkDto,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.editBookmarkById(
      userId,
      dto,
      bookmarkId,
    );
  } //parseIntpipe id used to convert the params to number cos params are strings)

  //=========DeleteBookmark===========//
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(
      userId,
      bookmarkId,
    );
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark-dto';
import { EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  
//================Create bookmark ==============//
  async createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ) {
    const bookmark =
      await this.prisma.bookmark.create({
        data: {
          title: dto.title,
          description: dto.description,
          link: dto.link,
          userId,
        },
      });
  return bookmark
  }
 
  //================= Get Bookmarks of a user ==============//
 async getBookmarks(userId: number) {
    const bookmarks = await  this.prisma.bookmark.findMany({
        where: {userId}
     })
     return bookmarks
  }
  
  //=================Get single Bookmark ===============//
 async getBookmarksById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmarks = await  this.prisma.bookmark.findFirst({
        where: {userId,
        id: bookmarkId}
     })
     return bookmarks
  }
//================== Edit Bookmark ================//
  async editBookmarkById(
    userId: number,
    dto: EditBookmarkDto,
    bookmarkId: number,
  ) {
    //get the bookmark by id
    const bookmark =  await this.prisma.bookmark.findUnique({
        where:{
            id: bookmarkId,
        }
    });
    if(!bookmark || bookmark.userId !== userId) {
        throw new ForbiddenException(
            "Access to resources denied"
        ) 
    }
   const editedBookmark = await this.prisma.bookmark.update({
    where:{
        id: bookmarkId,
    },
    data:{
        ...dto
    }
   })
     return editedBookmark;
  }
//=============== Delete Bookmark ================//
 async deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmark =  await this.prisma.bookmark.findUnique({
        where:{
            id: bookmarkId,
        }
    });
    if(!bookmark || bookmark.userId !== userId) {
        throw new ForbiddenException(
            "Access to resources denied"
        ) 
    }
    
    await this.prisma.bookmark.delete({
        where:{
            id: bookmarkId,
        }
    });
  }
  
}

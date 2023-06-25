import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark-dto';
import { EditBookmarkDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  
//================Create bookmark ==============//
  async createBookmark(
    userId: string,
    dto: CreateBookmarkDto,
  ) {
    const id = uuidv4().toString();
    const bookmark =
      await this.prisma.bookmark.create({
        data: {
          id,
          title: dto.title,
          description: dto.description,
          link: dto.link,
          userId,
        },
      });
  return bookmark
  }
 
  //================= Get Bookmarks of a user ==============//
 async getBookmarks(userId: string) {
     const bookmarks = await  this.prisma.bookmark.findMany({
        where: {userId}
     })
     return bookmarks
  }
  
  //=================Get single Bookmark ===============//
 async getBookmarksById(
    userId: string,
    bookmarkId: string,
  ) {
    const bookmark = await this.prisma.bookmark.findFirst({
        where: {userId,
        id: bookmarkId}
     });

     if(!bookmark) {
        return {message:"bookmark not found"}
     }
    
     return bookmark
   
  }
//================== Edit Bookmark ================//
  async editBookmarkById(
    userId: string,
    dto: EditBookmarkDto,
    bookmarkId: string,
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
    userId: string,
    bookmarkId: string,
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
    })
    return  {message:"Bookmark deleted"};
  }
  
}

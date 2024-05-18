import { Request, Response } from "express"
import { Author } from "../../models/author.model";
import { Book } from "../../models/books.model";
import { Employee as User } from "../../models/employee";

const normalQueries = async (req: Request, res: Response) => {


    // how many users are active
    // const user = await User.aggregate([{
    //     $match:{
    //         isActive:true
    //     }
    // },{
    //     $count:"totalActiveUsers"
    // }])

    // what is the avg age

    // const user = await User.aggregate([
    //     {
    //         $group:{
    //             _id:null,
    //             avgAge:{$avg:"$age"}
    //         }
    //     }

    // ])

    // top 5 fav fruits
    // const user = await User.aggregate([
    //     {
    //         $group:{
    //             _id:"$favoriteFruit",
    //             count:{$sum:1}
    //         }
    //     },
    //     {
    //         $sort:{
    //             count:-1
    //         }
    //     },{
    //         $limit:5
    //     }
    
    // ])


    // find total number of males and females
    // const user = await User.aggregate([
    //     {
    //         $group:{
    //             _id:"$gender",
    //             count:{$sum:1},
    //         }
    //     }
    // ])

    // which country has the highest number of registered users

    // const user = await User.aggregate([
    //     {
    //         $group:{
    //             _id:"$company.location.country",
    //             count:{$sum:1}
    //         }
    //     },
    //     {
    //         $sort:{
    //             count:-1
    //         }
    //     },
    //     {
    //         $limit:1
    //     }
    // ])

    // average number of tags per user

    // const user = await User.aggregate([
    //     {
    //         $unwind:"$tags"
    //     },
    //     {
    //         $group:{
    //             _id:"$_id",
    //             countTags:{$sum:1}
    //         }
    //     },
    //     {
    //         $group:{
    //             _id:null,
    //             average:{$avg:"$countTags"}
    //         }
    //     }
    // ])

    // OR
    
    // const user = await User.aggregate([
    //     {
    //         $addFields:{
    //             // tagsize:{$size:"$tags"}
    //             tagsize:{
    //                 $size:{$ifNull:["$tags",[]]}
    //             }
    //         }
    //     },{
    //         $group:{
    //             _id:null,
    //             averageTags:{$avg:"$tagsize"}
    //         }
    //     }
    // ])


    // count all the documents with enim as one of the tags

    // const user = await User.aggregate([
    //     {$match:{
    //         tags:"enim"
    //     }},
    //     {
    //         $count:"userWithEnimTags"
    //     }
    // ])

    // what are the name and age of users who are inactive and has  velit in the tags

    // const user = await User.aggregate([
    //     {
    //         $match:{
    //             isActive:false,
    //             tags:"velit"
    //         }
    //     },
    //     {
    //         $project:{
    //             name:1,
    //             age:1,
    //             tags:1,
    //             isActive:1
    //         }
    //     },
    //     {
    //         $limit:5
    //     }

    // ])

    
    // how many users have phone number starting with +1 (940)

    // const user = await User.aggregate([
    //     {
    //         $match:{
    //             "company.phone": /^\+1 \(940\)/
    //         }
    //     },
    //     {
    //         $count:"Special Phone numbers"
    //     }
    // ])


    // who has registered most recently, top 5, give name and registered date

    // const user = await User.aggregate([
    //     {
    //         $sort:{
    //             registered:-1
    //         }
    //     },
    //     {
    //         $limit:5
    //     },
    //     {
    //         $project:{
    //             name:1,
    //             registered:1
    //         }
    //     }
    // ])

    // give all the users {name, id} with eash fruitgroup

    // const user = await User.aggregate([
    //     {
    //         $group:{
    //             _id:"$favoriteFruit",
    //             users:{$push:{name:"$name",id:"$_id"}}
    //         }
    //     }
    // ])


    // how many users have tags as their second tag in the list of tags

    // const user = await User.aggregate([
    //     {
    //         $match:{
    //             "tags.1":"ad"
    //         }
    //     },
    //     {
    //         $project:{
    //             name:1,
    //             tags:1
    //         }
    //     }
    // ])

    // find users who have both enim and id as their tags

    // const user = await User.aggregate([
    //     {
    //         $match:{
    //             "tags":{$all:["enim","id"]}
    //         }
    //     },
    //     {
    //         $project:{
    //             name:1,
    //             tags:1
    //         }
    //     }

    // ])


    // list all the companies in usa with their corresponding user count

    // const user = await User.aggregate([
    //     {
    //         $match:{
    //             "company.location.country":"USA"
    //         }
    //     },
    //     {
    //         $count:"USA based companies"
    //     }
    // ])

    // const book = await Book.aggregate([
    //     {
    //         $lookup:{
    //             from:"authors",
    //             localField:"author_id",
    //             foreignField:"_id",
    //             as:"authorDetails"
    //         }
    //     },
    //     {
    //         $addFields:{
    //             authorDetails:{
    //                 $first:"$authorDetails"
    //             }
    //         }
    //     }
    // ])

    // or

    // const book = await Book.aggregate([
    //     {
    //         $lookup:{
    //             from:"authors",
    //             localField:"author_id",
    //             foreignField:"_id",
    //             as:"authorDetails"
    //         }
    //     },
    //     {
    //         $addFields:{
    //             authorDetails:{
    //                 $arrayElemAt:["$authorDetails",0]
    //             }
    //         }
    //     }
    // ])


    const book = await Book.aggregate([

        {
            $lookup:{
                from:"authors",
                localField:"author_id",
                foreignField:"_id",
                as:"authorDetails"
            }
        },
        {
            $addFields:{
                authorDetails:{
                    $arrayElemAt:["$authorDetails",0]
                }
            }
        },
        {
            $project:{

                title:1,
                genre:1,
                authorDetails:{
                    _id:1,
                    name:1
                }
            }
        }
    ])


    const data = book;
    res.status(200).json(data);

    //
}


export { normalQueries };
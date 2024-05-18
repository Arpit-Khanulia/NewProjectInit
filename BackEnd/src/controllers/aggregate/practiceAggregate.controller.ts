import { Request, Response } from "express";
import { Employee as User } from "../../models/employee";

const practiceAggregate = async (req: Request, res: Response) => {

    // 1 how many users are active, give top 10 sorted by age
    // 2 what is the avg age
    // 3 top 5 fav fruits
    // 4 find total number of males and females
    // 5 which country has the highest number of registered users
    // 6 average number of tags per user
    // 7 count all the documents with enim as one of the tags
    // 8 what are the name and age of users who are inactive and has  velit in the tags
    // 9 how many users have phone number starting with +1 (940)
    // 10 who has registered most recently, top 5, give name and registered date



    //1 
    // const user = await User.aggregate([
    //     {
    //         $match: {
    //             isActive: true
    //         }
    //     },
    //     {
    //         $sort:{
    //             age:-1
    //         }

    //     },
    //     {
    //         $limit: 10
    //     }
    // ])

    //2
    // const user = await User.aggregate([
    //     {
    //         $group:{
    //             _id:null,
    //             average:{$avg:"$age"}
    //         }
    //     }
    // ])

    //3
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
    //     },
    //     {
    //         $limit:5
    //     }
    // ])

    //4
    // const user = await User.aggregate([
    //     {
    //         $group:{
    //             _id:"$gender",
    //             count:{$sum:1}
    //         }
    //     }
    // ])

    //5
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
    //         $limit: 1
    //     }
    // ])

    //6
    // const user = await User.aggregate([
    //     {
    //         $unwind: "$tags"
    //     },
    //     {
    //         $group: {
    //             _id: "$_id",
    //             noOfTags: { $sum: 1 }
    //         }
    //     },
    //     {
    //         $group:{
    //             _id:null,
    //             averageTagsPerUser:{$avg:"$noOfTags"}
    //         }
    //     }
    // ])

    //or 
    // const user = await User.aggregate([
    //     {
    //         $addFields:{
    //             tagSize:{$size:"$tags"}
    //         }
    //     },
    //     {
    //         $group:{
    //             _id:"$id",
    //             averageNumberOfTagsPerUser:{$avg:"$tagSize"}
    //         }
    //     }
    // ])

    //7 
    // const user = await User.aggregate([
    //     {
    //         $match:{
    //             tags:"enim"
    //         }
    //     },
    //     {
    //         $limit:5
    //     }
    // ])


    //8
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
    //             age:1
    //         }
    //     }
    // ])

    //9
    const user = await User.aggregate([
        {
            $match:{
                "company.phone": { $regex: "^\\+1\\s\\(940\\)"}
            }
        },
        {
            $count:"specialPhoneNumbers:"
            
        }
    ])

    const data = user


    res.status(200).json(data);

}

export { practiceAggregate };
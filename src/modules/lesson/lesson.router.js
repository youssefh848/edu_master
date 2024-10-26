import { Router } from "express";
import { isValid } from "../../middleware/vaildation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addLessonVal, deleteLessonVal, getLessonByIdVal, payLessonVal, updateLessonVal } from "./lesson.validation.js";
import { addLesson, deleteLesson, getLessonById, getLessons, payLesson, updateLesson } from "./lesson.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/autheraization.js";
import { roles } from "../../utils/constant/enums.js";


const lessonRouter = Router();

// add lesson   
lessonRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    isValid(addLessonVal),
    asyncHandler(addLesson)
)

// update lesson 
lessonRouter.put('/:lessonId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    isValid(updateLessonVal),
    asyncHandler(updateLesson)
)

// get lessons to spesefic classLevel
lessonRouter.get('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.USER]),
    asyncHandler(getLessons)
)

// get lesson by id  
lessonRouter.get('/:lessonId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.USER]),
    isValid(getLessonByIdVal),
    asyncHandler(getLessonById)
)

// delete lesson  
lessonRouter.delete('/:lessonId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    isValid(deleteLessonVal),
    asyncHandler(deleteLesson)
)

// pay lesson
lessonRouter.post('/pay/:lessonId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.USER]),
    isValid(payLessonVal),
    asyncHandler(payLesson)
)

export default lessonRouter;
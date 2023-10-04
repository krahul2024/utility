import Router from 'express'; 
import {auth} from '../middlewares/auth.js'
import {
	newPost, 
} from '../controllers/post.js'

const router = Router(); 


// router.get('/all', auth, getPosts); 


router.post('/new', auth, newPost); 


export default router; 
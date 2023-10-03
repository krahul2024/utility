import express from 'express'; 
const router = express.Router(); 



router.get('/', async(req,res) => {
	return res.status(200).send({
		success:true, 
		msg:'This is text router.'
	}); 
}); 


export default router; 
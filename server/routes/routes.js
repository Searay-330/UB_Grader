import { Router } from 'express';
const router = new Router();

// test
router.get('/test', function (req, res) {
	res.json("this is a get request")
});

// router.post('/ptest', function(req,res){
// 	res.json("this is a post request user given: " + req.body.user);
// });


export default router;

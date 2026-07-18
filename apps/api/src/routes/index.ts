import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { repositoryRouter } from './repository.routes.js';
import { dashboardRouter } from './dashboard.routes.js';
import { adminRouter } from './admin.routes.js';
import {analyzeCodeForBugs} from '../services/ai.service.js';

const router = Router();
router.post('/ai/analyze', async (req,res)=>{
    try{
        const {code}=req.body;
        if(!code){
            return res.status(400).json({error:"Code content body required"});

        }
        const analysisResult=await analyzeCodeForBugs(code);
        return res.json({success:true,analysis:analysisResult});

    }
    catch(err:any){
        return res.status(500).json({error:err.message});

    }

});

router.use('/auth', authRouter);
router.use('/repositories', repositoryRouter);
router.use('/dashboard', dashboardRouter);
router.use('/admin', adminRouter);

export { router as apiRouter };
export default router;

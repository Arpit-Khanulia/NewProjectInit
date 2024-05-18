import {Router} from 'express';
import { normalQueries } from '../controllers/aggregate/normalQueries.controllers';
import {practiceAggregate} from '../controllers/aggregate/practiceAggregate.controller';

const router = Router();


router.get('/', normalQueries);
router.get('/practice',practiceAggregate)

export default router;
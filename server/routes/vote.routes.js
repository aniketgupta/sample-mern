import { Router } from 'express';
import * as VoteController from '../controllers/vote.controller';
const router = new Router();

// Add a new Vote
router.route('/add_vote').post(VoteController.addVote);

// Get total votes for karan
router.route('/total_votes_karan').get(VoteController.getTotalVotesKaran);

// Get total votes for arjun
router.route('/total_votes_arjun').get(VoteController.getTotalVotesArjun);

export default router;

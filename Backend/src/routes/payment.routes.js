import { Router } from 'express';
import { 
    createEscrowPayment, 
    getBookingPayment, 
    updateEscrowStatus 
} from '../controllers/payment.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();
router.use(verifyJWT);

router.route("/escrow").post(createEscrowPayment);
router.route("/booking/:bookingId").get(getBookingPayment);
router.route("/escrow/:paymentId").patch(updateEscrowStatus);

export default router;

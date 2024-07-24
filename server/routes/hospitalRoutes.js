import express from 'express';
import { createHospital, getHospitals, deleteHospitals, getHospitalProfile, getAllHospitals, updateHospital, updateHospital2, createDetails } from '../controllers/hospitalControllers.js';

const router = express.Router();

router.post('/hospitals/create', createHospital);
router.get('/hospitals', getHospitals);
router.get('/hospitals/hospitalProfile/:id', getHospitalProfile);
router.put('/hospitals/update/:id', updateHospital);
router.get('/hospitals/update/:id', updateHospital2);
router.get('/hospitals/:userId', getAllHospitals); // Changed this line to use userId as a parameter
router.post('/hospitals/details', createDetails);
router.delete('/hospitals/delete/:id', deleteHospitals);

export default router;

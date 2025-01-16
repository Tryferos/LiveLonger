import express from "express";
import { ROUTES } from "../../constants/Routes";
import path from "path";
import { MAIN_PATH } from "../..";


export const router = express.Router();

router.get(ROUTES.INFO.DELETE_ACCOUNT, (req, res) => {
    res.send('Delete Account');
})
router.get(ROUTES.INFO.PRIVACY_POLICY, (req, res) => {
    res.redirect('/public/privacy-policy.html');
})
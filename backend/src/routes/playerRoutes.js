import express from "express";

import { getPlayer, getPlayerLiveMatch } from "../controllers/riotAccountController.js";

const router = express.Router();

router.get("/:username", getPlayer);
router.get("/live-match/:username", getPlayerLiveMatch)

export default router;
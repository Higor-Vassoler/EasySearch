import { getAccountByRiotId } from "../services/riotAccountService.js";
import { getCurrentGameInfo } from "../services/riotSpectatorService.js";

export async function getPlayer(req, res) {
    const data = req.params.username;
    const parts = data.split("#");

    if (!data.includes("#") || parts.length !== 2) {
        return res.status(400).json({
            message: "Riot ID inválido. Utilize gameName#tagLine."
        });
    }

    const [gameName, tagLine] = parts;

    if (!gameName || !tagLine) {
        return res.status(400).json({
            message: "Riot ID inválido. gameName e tagLine são obrigatórios."
        });
    }

    try {
        const dados = await getAccountByRiotId(gameName, tagLine); // return a AccountDto(object)

        res.json(dados);

    } catch (error) {
        const status = error.status ?? 500;

        res.status(status).json({
            message: "Erro interno do servidor."
        });
    }
}

export async function getPlayerLiveMatch(req, res) {
    const data = req.params.username;
    const parts = data.split("#");

    if (!data.includes("#") || parts.length !== 2) {
        return res.status(400).json({
            message: "Riot ID inválido. Utilize gameName#tagLine."
        });
    }

    const [gameName, tagLine] = parts;

    if (!gameName || !tagLine) {
        return res.status(400).json({
            message: "Riot ID inválido. gameName e tagLine são obrigatórios."
        });
    }

    let conta;

    // 1. Busca a conta
    try {
        conta = await getAccountByRiotId(gameName, tagLine);

    } catch (error) {
        const status = error.status ?? 500;

        return res.status(status).json({
            message: status === 404
                ? "Jogador não encontrado."
                : "Erro ao buscar a conta do jogador."
        });
    }

    // 2. Extrai o PUUID
    const { puuid } = conta;

    if (!puuid) {
        return res.status(500).json({
            message: "Não foi possível obter o PUUID do jogador."
        });
    }
    
    // 3. Busca a partida atual
    try {
        const dados = await getCurrentGameInfo(puuid); // return a CurrentGameInfo(object)

        return res.json(dados);

    } catch (error) {
        const status = error.status ?? 500;

        if (status === 404) {
            return res.status(404).json({
                message: "O jogador não está em uma partida."
            });
        }

        return res.status(status).json({
            message: "Erro ao buscar a partida atual."
        });
    }
}
export async function getCurrentGameInfo(puuid) {
    const URL = `https://br1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}`;

    try {
        const res = await fetch(URL, {
            headers: {
                "X-Riot-Token": process.env.RIOT_API_KEY
            }
        });
        if (!res.ok) {
            const error = new Error(`Response Status: ${res.status}`);
            error.status = res.status;

            throw error;
        }

        const data = await res.json(); // return a CurrentGameInfo(object)

        return data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
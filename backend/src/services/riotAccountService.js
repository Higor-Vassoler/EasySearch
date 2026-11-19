export async function getAccountByRiotId(gameName, tagLine) {
    const gameNameF = encodeURIComponent(gameName);
    const tagLineF = encodeURIComponent(tagLine);
    const URL = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameNameF}/${tagLineF}`;

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

        const data = await res.json(); // return a AccountDto(object)
        return data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
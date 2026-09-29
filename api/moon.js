export default async function handler(req, res) {

    try {

        const { date } = req.query;

        if (!date) {

            return res.status(400).json({
                error: "Birth date is required."
            });

        }


        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {

            return res.status(400).json({
                error: "Invalid date format."
            });

        }


       

        const timestamp =
            `${date}T12:00:00Z`;


        const url =
            new URL(
                "https://api.freeastroapi.com/api/v1/moon/phase"
            );


        url.searchParams.set(
            "date",
            timestamp
        );

        url.searchParams.set(
            "include_visuals",
            "true"
        );

        url.searchParams.set(
            "include_special",
            "true"
        );


        const response = await fetch(
            url,
            {
                method: "GET",

                headers: {
                    "x-api-key":
                        process.env.FREEASTRO_API_KEY
                }
            }
        );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "FreeAstroAPI error:",
                errorText
            );

            return res.status(
                response.status
            ).json({
                error:
                    "Moon API request failed."
            });
        }


        const data =
            await response.json();


        return res.status(200).json(data);


    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error:
                "Something went wrong."
        });

    }
}

import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
app.use(express.static('public'));

let accessToken = process.env.ACCESS_TOKEN;

const config = () => ({
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
});

const artistIDs = ["3TVXtAsR1Inumwj472S9r4","06HL4z0CvFAxyc27GXpf02","4q3ewBCX7sLwd24euuV69X","1Xyo4u8uXC1ZmMpatF05PJ","1uNFoZAHBGtllmzznpCI3s","6eUKZXaKkcviH0Ku9w2n3V","7dGJo4pcD2V6oG8kP0tJRR","66CXWjxzNUsdJxJ2JdwvnR",
    "0Y5tJX1MQlPlqiwlOH1tJY","5K4W6rqBFWDnAN6FQUkS6x","246dkjvS1zLTtiykXe5h60","1vyhD5VmyZ7KMfW5gqLgo5","5pKCCKE2ajJHZ9KAiaK11H","3Nrfpe0tUJi4K4DXYWgMUX","1RyvyyTE3xzB2ZywiAwp0i","1i8SpTcr7yvPOmcqrbnVXY",
    "4MCBfE4596Uoi2O4DtmEMz","2YZyLoL8N0Wb9xBt1NhZWg","6qqNVTkY8uBg9cP3Jd7DAH","0hCNtLu0JehylgoiP8L4Gh","0du5cEVh5yTK9QJze8zA0C","53XhwfbYqKCa1cC15pYq2q","7bXgB6jMjp9ATFy66eO08Z","4gzpq5DPGxSnKTe4SA8HAU","15UsOTVnJzReFVN1VCnxy4",
    "6M2wZ9GZgrQXHCFfjv46we","4VMYDCV2IEDYJArk749S6m","6LuN9FCkKOj5PcnpouEgny","55Aa2cqylxrFIXC767Z865","1URnnhqYAYcrqrcwql10ft","1Cs0zKBU1kc0i8ypK3B9ai","2R21vXR83lH98kGeO99Y66",
    "5f7VJjfbwm532GiveGC0ZK","00FQb4jTyendYWaN8pK0wa","04gDigrS5kc9YWfZHwBETP","6vWDO969PvNqNYHIOW5v0m","4O15NlyKLIASxsJ0PrXPfz","1r4hJ1h58CWwUQe3MxPuau","1mcTU81TzQhprhouKaTkpq","7CajNmpbOovFoOoasH2HaY",
    "6l3HvQ5sa6mXTsMTB19rO5","5WUlDfRSoLAfcVSX1WnrxN","50co4Is1HCEo8bhOyUWKpn","7n2wHs1TKAczGzO7Dd2rGr","790FomKkXshlbRYZFtlgla","2wY79sveU1sp5g7SokKOiI","329e4yvIujISKGKz1BZZbO","7tYKF4w9nC0nq9CsPZTHyP",
    "7iK8PXO48WeuP03g8YR51W","1dfeR4HaWDbWqFHLkxsg1d","5cj0lLjcoR7YOSnhnX0Po5","6KImCVD70vtIoJWnq6nGn3","1HY2Jd0NmPuamShAr6KMms","0C8ZW7ezQVs4URX5aX7Kqx",
    "4AK6F7OLvEQ5QYCBNiQWHq","2LRoIwlKmHjgvigdNGBHNo","7c0XG5cIJTrrAgEC3ULPiq","4dpARuHxo51G3z768sgnrY","1SupJlEpv7RS2tPNRaHViT","26VFTg2z8YR0cCuwLzESi2","0EmeFodog0BfCgMzAIvKQp","6jJ0s89eD6GaHleKKya26X","0iEtIxbK0KxaSlF7G42ZOp","3WrFJ7ztbogyGnTHbHJFl2","6XyY86QOPPrYVGvF9ch6wz",
    "137W8MRPWKqSmrBGDBFSop","2hlmm7s2ICUX0LVIhVFlZQ","69GGBxA162lTqCwzJG5jLp","4YRxDV8wJFPHPTeXepOstw","64KEffDW9EtZ1y2vBYgq8T","7Ln80lUS6He07XvHI8qqHH","4kYSro6naA4h99UJvo89HB","5YGY8feqx7naU7z4HrwZM6",
    "3nFkdlSjzX9mRTtwJOzDYB","1McMsnEElThX1knmY4oliG","4nDoRrQiYLoBzwC5BhVJzF","4r63FhuTkUYltbVAg5TQnk","13ubrt8QOOCPljQ2FL1Kca","1vCWHaC5f2uS3yhpwWbIA6","0TnOYISbd1XYRBk9myaseg",
    "3YQKmKGau1PzlVlkL1iodx","23fqKkggKUBHNkbKtXEls4","0VRj0yCOv2FXJNP47XQnx5","4oUHIQIBe0LHzYfvXNW4QM","77ziqFxp5gaInVrF2lj4ht","2h93pZq0e7k5yf4dywlkpM","4V8LLVI7PbaPR0K2TGSxFF","5Pwc4xIPtQLFEnJriah9YJ",
    "0L8ExT028jH3ddEcZwqJJ5","5LHRHt1k9lMyONurDHEdrp","7hJcb9fa4alzcOq3EaNPoG","6Xgp2XMz1fhVYe7i6yNAax","12GqGscKJx3aE4t07u7eVZ","07YZf4WDAMNwqr4jfgOZ8y","4SsVbpTthjScTS7U2hmr1X",
    "3fMbdgg4jU18AjLCKBhRSm","4LLpKhyESsyAXpc4laK94U","64M6ah0SkkRsnPGtGiRAbb","1VPmR4DJC1PlOtd0IADAO0","31W5EY0aAly4Qieq6OFu6I","6S2OmqARrzebs0tKUEyXyp","699OTQXzgjhIYAHMy9RyPD","6VuMaDnrHyPL1p4EHjYLi7",
    "2o5jDhtHVPhrJdv3cEQ99Z","1zNqQNIdeOUZHb8zbZRFMX","0eDvMgVFoNV3TpwtrVCoTj","3PhoLpVuITZKcymswpck5b","7wlFDEWiM5OoIAt8RSli8b","3q7HBObVc0L8jNeTe5Gofh","0c173mlxpT3dSFRgMO8XPh","6oMuImdp5ZcFhWP0ESe6mG",
    "46SHBwWsqBkxI7EeeBEQG7","1wRPtKGflJrBx9BmLsSwlU","07YUOmWljBTXwIseAUd9TW","7Gi6gjaWy3DxyilpF1a8Is","41MozSoPIsD1dJM0CLPjZF","0tmwSHipWxN12fsoLcFU3B","2ye2Wgw4gimLv2eAKyk1NB","5lwmRuXgjX8xIwlnauTZIP",
    "02kJSzxNuaWGqwubyUba0Z","5fMUXHkw8R8eOP2RNVYEZX","4tZwfgrHOc3mvqYlEYSvVi","0X2BH1fck6amBIoJhDVmmJ","6nVcHLIgY5pE2YCl8ubca1","31TPClRtHm23RisEBtV3X7","6AgTAQt8XS6jRWi4sX7w49","13y7CgLHjMVRMDqxdx0Xdo",
    "7vk5e3vY1uw9plTHJAMwjN",
    "1KCSPY1glIKqW2TotWuXOR",
    "540vIaP2JwjQb9dm3aArA4",
    "3Isy6kedDrgPYoTS1dazA9",
    "77SW9BnxLY8rJ0RciFqkHh",
    "4IWBUUAFIplrNtaOHcJPRM",
    "1yR65psqiazQpeM79CcGh8",
    "17lzZA2AlOHwCwFALHttmp",
    "711MCceyCBcFnzjGY4Q7Un",
    "716NhGYqD1jl2wI1Qkgq36",
    "2jku7tDXc6XoB6MO2hFuqg",
    "14zUHaJZo1mnYtn6IBRaRP",
    "20JZFwl6HVl6yg8a4H3ZqK",
    "4DdkRBBYG6Yk9Ka8tdJ9BW",
    "2nszmSgqreHSdJA3zWPyrW",
    "4xRYI6VqpkE3UwrDrAZL8L",
    "23zg3TcAtWQy7J6upgbUnj",
    "3hcs9uc56yIGFCSy9leWe7",
    "718COspgdWOnwOFpJHRZHS",
    "3xvaSlT4xsyk6lY1ESOspO",
    "7jVv8c5Fj3E9VhNjxT4snq",
    "757aE44tKEUQEqRuT6GnEB",
    "2kCcBybjl3SAtIcwdWpUe3",
    "4UXqAaa6dQYAk18Lv7PEgX",
    "0fA0VVWsXO9YnASrzqfmYu",
    "7ltDVBr6mKbRvohxheJ9h1",
    "4fxd5Ee7UefO4CUXgwJ7IP"];

let score = 0;
let decision;

function getRandomArtistID() {
    return artistIDs[Math.floor(Math.random() * artistIDs.length)];
}

async function fetchArtistData(artistID) {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistID}`, config());
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            await newAccessToken();
            return fetchArtistData(artistID); 
        }
        throw error;
    }
}

async function newAccessToken() {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'grant_type=client_credentials',
        method: 'post'
    };

    try {
        const response = await axios(authOptions);
        if (response.status === 200) {
            accessToken = response.data.access_token;
            process.env.ACCESS_TOKEN = accessToken;
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

app.get('/', async (req, res) => {
    try {
        const artistID1 = getRandomArtistID();
        const artistID2 = getRandomArtistID();

        let artist1 = await fetchArtistData(artistID1);
        let artist2 = await fetchArtistData(artistID2);

        while (artist1.name === artist2.name) {
            artistID2 = getRandomArtistID();
            artist2 = await fetchArtistData(artistID2);
        }


        res.render('index.ejs', {
            artist_img1: artist1.images[0].url,
            name1: artist1.name,
            name2: artist2.name,
            artist_img2: artist2.images[0].url,
            artistID1: artistID1,
            artistID2: artistID2,
            score: score,
            decision: decision
        });
    } catch (error) {
        if(error.response && error.response.status === 401) {
            await newAccessToken();
            return res.redirect('/');
        };
        console.error('Error:', error.message);
    }
});

app.post('/', async (req, res) => {
    try {
        const chosenArtistID = req.body.chosenArtistID;
        const artistID1 = req.body.artistID1;
        const artistID2 = req.body.artistID2;

        const [chosenArtist, artist1, artist2] = await Promise.all([
            fetchArtistData(chosenArtistID),
            fetchArtistData(artistID1),
            fetchArtistData(artistID2)
        ]);

        let correctArtist;
        if (artist1.followers.total === artist2.followers.total) {
            correctArtist = "TIE";
        } else if (artist1.followers.total > artist2.followers.total) {
            correctArtist = artist1.id;
        } else {
            correctArtist = artist2.id;
        }

        if (chosenArtist.id === correctArtist || correctArtist === "TIE") {
            decision = "Correct!";
            score++;
        } else {
            decision = "Incorrect!";
            score = 0;
        }

        res.redirect('/');
    } catch (error) {
        if(error.response && error.response.status === 401) {
            await newAccessToken();
            return res.redirect('/');
        };
        console.error('Error:', error.message);
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

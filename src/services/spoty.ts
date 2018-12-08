import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { RequestOptions } from '@angular/http';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * 
 *  POSSIBILE SCOPES: user-read-private user-read-birthdate user-read-email playlist-read-private user-library-read 
 *                    user-library-modify user-top-read playlist-read-collaborative playlist-modify-public 
 *                    playlist-modify-private user-follow-read user-follow-modify user-read-playback-state
 *                    user-read-currently-playing user-modify-playback-state user-read-recently-played
 *    
 * 
 */



const SCOPES = 'user-read-private user-read-email user-read-currently-playing user-read-recently-played';

const API_URL = "https://accounts.spotify.com/api/token";
const CLIENT_ID = '800e6e3b533d4036b6b73756b97e5d96';
const CLIENT_SECRET = '02270eb0bc5e4a78b4dc68f9b479a27b';
const CLIENT_CALLBACK_URL = 'http://localhost:8100/';

const config = {
    client_id:CLIENT_ID,
    redirect_uri: CLIENT_CALLBACK_URL

}
const dummyResp = {
  "tracks": {
    "href": "https://api.spotify.com/v1/search?query=mecna&type=track&market=IT&offset=0&limit=20",
    "items": [
      {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/4l3J2E5Ar45KDy2YJOSwlM"
          },
          "href": "https://api.spotify.com/v1/albums/4l3J2E5Ar45KDy2YJOSwlM",
          "id": "4l3J2E5Ar45KDy2YJOSwlM",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/2b9e9b1e922c9bca14504735163052377637c95f",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/822303bceec1a8042bc99edda8cd514de9951ca4",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/cfa55ed593d0f2141ba5a7ae0d4087af8ef59d2d",
              "width": 64
            }
          ],
          "name": "Tu Ed Io (feat. CoCo)",
          "release_date": "2018-04-27",
          "release_date_precision": "day",
          "total_tracks": 1,
          "type": "album",
          "uri": "spotify:album:4l3J2E5Ar45KDy2YJOSwlM"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1gDetUHNycXoXylRW8ApfH"
            },
            "href": "https://api.spotify.com/v1/artists/1gDetUHNycXoXylRW8ApfH",
            "id": "1gDetUHNycXoXylRW8ApfH",
            "name": "CoCo",
            "type": "artist",
            "uri": "spotify:artist:1gDetUHNycXoXylRW8ApfH"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 249590,
        "explicit": true,
        "external_ids": {
          "isrc": "ITUM71800466"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/0TZw0PpTLKbfRwIBjptNEl"
        },
        "href": "https://api.spotify.com/v1/tracks/0TZw0PpTLKbfRwIBjptNEl",
        "id": "0TZw0PpTLKbfRwIBjptNEl",
        "is_local": false,
        "name": "Tu Ed Io (feat. CoCo)",
        "popularity": 50,
        "preview_url": null,
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:0TZw0PpTLKbfRwIBjptNEl"
      },
      {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6O0RPSLmnsp24JumnaPrct"
          },
          "href": "https://api.spotify.com/v1/albums/6O0RPSLmnsp24JumnaPrct",
          "id": "6O0RPSLmnsp24JumnaPrct",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/a51aad4eb4648252476767100b6455e6ccc3a03a",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/cd67f026bc2c87380c1b2be7e0354bfda72f46b2",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/9fe05722ca7602fb2a7e173323d1d7057b89cda9",
              "width": 64
            }
          ],
          "name": "Pratica",
          "release_date": "2018-01-25",
          "release_date_precision": "day",
          "total_tracks": 1,
          "type": "album",
          "uri": "spotify:album:6O0RPSLmnsp24JumnaPrct"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 237187,
        "explicit": true,
        "external_ids": {
          "isrc": "ITUM71800068"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/6ZxOddHeIJTf0coB9FQ4K7"
        },
        "href": "https://api.spotify.com/v1/tracks/6ZxOddHeIJTf0coB9FQ4K7",
        "id": "6ZxOddHeIJTf0coB9FQ4K7",
        "is_local": false,
        "name": "Pratica",
        "popularity": 47,
        "preview_url": null,
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:6ZxOddHeIJTf0coB9FQ4K7"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/0WREDkJ6F8EelZQVUT6A5s"
          },
          "href": "https://api.spotify.com/v1/albums/0WREDkJ6F8EelZQVUT6A5s",
          "id": "0WREDkJ6F8EelZQVUT6A5s",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/92406734d46e4b34f336462894517d3f9d2e4a4b",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/54ac292b19a7af3378c5dc8c2aa0f7eeb8e07d58",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/5ed12e29cfa9ac562eb31785f1b3913d19c3b24c",
              "width": 64
            }
          ],
          "name": "Laska",
          "release_date": "2015-01-27",
          "release_date_precision": "day",
          "total_tracks": 13,
          "type": "album",
          "uri": "spotify:album:0WREDkJ6F8EelZQVUT6A5s"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 196120,
        "explicit": true,
        "external_ids": {
          "isrc": "ITZA81400213"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/6LCWOx4TYuKnewYJ2jvZXm"
        },
        "href": "https://api.spotify.com/v1/tracks/6LCWOx4TYuKnewYJ2jvZXm",
        "id": "6LCWOx4TYuKnewYJ2jvZXm",
        "is_local": false,
        "name": "31/08",
        "popularity": 46,
        "preview_url": null,
        "track_number": 5,
        "type": "track",
        "uri": "spotify:track:6LCWOx4TYuKnewYJ2jvZXm"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/3fhMfkPPzksWuw0hEm4ldm"
              },
              "href": "https://api.spotify.com/v1/artists/3fhMfkPPzksWuw0hEm4ldm",
              "id": "3fhMfkPPzksWuw0hEm4ldm",
              "name": "Ernia",
              "type": "artist",
              "uri": "spotify:artist:3fhMfkPPzksWuw0hEm4ldm"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/3jaseqJUAT1PMLbpYKCUPq"
          },
          "href": "https://api.spotify.com/v1/albums/3jaseqJUAT1PMLbpYKCUPq",
          "id": "3jaseqJUAT1PMLbpYKCUPq",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/3e8b7ffd0d1c9aa27b03f46e91dfb71f0e162ded",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/de0371793e816cb6bf5966ce7a4d83ba43b12562",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/bc1005399e9d7ca1dfb9b75312548728ac83d08e",
              "width": 64
            }
          ],
          "name": "Come Uccidere Un Usignolo (67 Edition)",
          "release_date": "2017-11-03",
          "release_date_precision": "day",
          "total_tracks": 16,
          "type": "album",
          "uri": "spotify:album:3jaseqJUAT1PMLbpYKCUPq"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/3fhMfkPPzksWuw0hEm4ldm"
            },
            "href": "https://api.spotify.com/v1/artists/3fhMfkPPzksWuw0hEm4ldm",
            "id": "3fhMfkPPzksWuw0hEm4ldm",
            "name": "Ernia",
            "type": "artist",
            "uri": "spotify:artist:3fhMfkPPzksWuw0hEm4ldm"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 215960,
        "explicit": false,
        "external_ids": {
          "isrc": "ITDF61777048"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/4W3V8umeNpKT4OZ7NOSYqq"
        },
        "href": "https://api.spotify.com/v1/tracks/4W3V8umeNpKT4OZ7NOSYqq",
        "id": "4W3V8umeNpKT4OZ7NOSYqq",
        "is_local": false,
        "name": "Tradimento (Il Traditore)",
        "popularity": 47,
        "preview_url": null,
        "track_number": 5,
        "type": "track",
        "uri": "spotify:track:4W3V8umeNpKT4OZ7NOSYqq"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6HuPZNzH3yKXr6LhEGt81Z"
          },
          "href": "https://api.spotify.com/v1/albums/6HuPZNzH3yKXr6LhEGt81Z",
          "id": "6HuPZNzH3yKXr6LhEGt81Z",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/06934fb2d631103a13e574c1c72a71aa71ede614",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/a05f6df48d59501b428a4ecd12189dfc71df6aeb",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/85d6f73a9bc0377e0b89172e65e586531c792c69",
              "width": 64
            }
          ],
          "name": "Lungomare Paranoia",
          "release_date": "2017-01-13",
          "release_date_precision": "day",
          "total_tracks": 12,
          "type": "album",
          "uri": "spotify:album:6HuPZNzH3yKXr6LhEGt81Z"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 253946,
        "explicit": false,
        "external_ids": {
          "isrc": "ITZA81600019"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/0BtWUAPQOHh80L0cvqsiFt"
        },
        "href": "https://api.spotify.com/v1/tracks/0BtWUAPQOHh80L0cvqsiFt",
        "id": "0BtWUAPQOHh80L0cvqsiFt",
        "is_local": false,
        "name": "Il tempo non ci basterà",
        "popularity": 43,
        "preview_url": "https://p.scdn.co/mp3-preview/a806eab098a30f7c796e1b95b0ca54b974d1b1b0?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 11,
        "type": "track",
        "uri": "spotify:track:0BtWUAPQOHh80L0cvqsiFt"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/2E6AK3UPEGCvjnzuygCh2h"
              },
              "href": "https://api.spotify.com/v1/artists/2E6AK3UPEGCvjnzuygCh2h",
              "id": "2E6AK3UPEGCvjnzuygCh2h",
              "name": "Night Skinny",
              "type": "artist",
              "uri": "spotify:artist:2E6AK3UPEGCvjnzuygCh2h"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6Q8K8bJqN7f0P90NcFOJtS"
          },
          "href": "https://api.spotify.com/v1/albums/6Q8K8bJqN7f0P90NcFOJtS",
          "id": "6Q8K8bJqN7f0P90NcFOJtS",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/b50540cda61e16328a804be6899ccb24e7be1ca6",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/46498a109d0a52657288a1b2de6a6d737dfb6e81",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/95045f0df48da58b1da258f81d46184bdb917007",
              "width": 64
            }
          ],
          "name": "Pezzi",
          "release_date": "2017-12-08",
          "release_date_precision": "day",
          "total_tracks": 16,
          "type": "album",
          "uri": "spotify:album:6Q8K8bJqN7f0P90NcFOJtS"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/2E6AK3UPEGCvjnzuygCh2h"
            },
            "href": "https://api.spotify.com/v1/artists/2E6AK3UPEGCvjnzuygCh2h",
            "id": "2E6AK3UPEGCvjnzuygCh2h",
            "name": "Night Skinny",
            "type": "artist",
            "uri": "spotify:artist:2E6AK3UPEGCvjnzuygCh2h"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/5FEh6KHK99CyLXp3qFvZFM"
            },
            "href": "https://api.spotify.com/v1/artists/5FEh6KHK99CyLXp3qFvZFM",
            "id": "5FEh6KHK99CyLXp3qFvZFM",
            "name": "CoCo",
            "type": "artist",
            "uri": "spotify:artist:5FEh6KHK99CyLXp3qFvZFM"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 254533,
        "explicit": false,
        "external_ids": {
          "isrc": "ITIWE1700045"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/6zViBln1URLEE1UaIinJg0"
        },
        "href": "https://api.spotify.com/v1/tracks/6zViBln1URLEE1UaIinJg0",
        "id": "6zViBln1URLEE1UaIinJg0",
        "is_local": false,
        "name": "Equilibrio (feat. Mecna, Coco)",
        "popularity": 38,
        "preview_url": "https://p.scdn.co/mp3-preview/362326048a92d345ec9f4ac02b277804bf573241?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 9,
        "type": "track",
        "uri": "spotify:track:6zViBln1URLEE1UaIinJg0"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6HuPZNzH3yKXr6LhEGt81Z"
          },
          "href": "https://api.spotify.com/v1/albums/6HuPZNzH3yKXr6LhEGt81Z",
          "id": "6HuPZNzH3yKXr6LhEGt81Z",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/06934fb2d631103a13e574c1c72a71aa71ede614",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/a05f6df48d59501b428a4ecd12189dfc71df6aeb",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/85d6f73a9bc0377e0b89172e65e586531c792c69",
              "width": 64
            }
          ],
          "name": "Lungomare Paranoia",
          "release_date": "2017-01-13",
          "release_date_precision": "day",
          "total_tracks": 12,
          "type": "album",
          "uri": "spotify:album:6HuPZNzH3yKXr6LhEGt81Z"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "disc_number": 1,
        "duration_ms": 265400,
        "explicit": false,
        "external_ids": {
          "isrc": "ITZA81600016"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/2o9gNNbwPtfsReOyFgjMd4"
        },
        "href": "https://api.spotify.com/v1/tracks/2o9gNNbwPtfsReOyFgjMd4",
        "id": "2o9gNNbwPtfsReOyFgjMd4",
        "is_local": false,
        "name": "Nonostante sia",
        "popularity": 41,
        "preview_url": "https://p.scdn.co/mp3-preview/b213baac6231fc856e7a3b0f1cb80fe36a3e1bc1?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 8,
        "type": "track",
        "uri": "spotify:track:2o9gNNbwPtfsReOyFgjMd4"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6HuPZNzH3yKXr6LhEGt81Z"
          },
          "href": "https://api.spotify.com/v1/albums/6HuPZNzH3yKXr6LhEGt81Z",
          "id": "6HuPZNzH3yKXr6LhEGt81Z",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/06934fb2d631103a13e574c1c72a71aa71ede614",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/a05f6df48d59501b428a4ecd12189dfc71df6aeb",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/85d6f73a9bc0377e0b89172e65e586531c792c69",
              "width": 64
            }
          ],
          "name": "Lungomare Paranoia",
          "release_date": "2017-01-13",
          "release_date_precision": "day",
          "total_tracks": 12,
          "type": "album",
          "uri": "spotify:album:6HuPZNzH3yKXr6LhEGt81Z"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 221386,
        "explicit": false,
        "external_ids": {
          "isrc": "ITZA81600010"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/6co2xSfZogeiDJE0Mc1mL3"
        },
        "href": "https://api.spotify.com/v1/tracks/6co2xSfZogeiDJE0Mc1mL3",
        "id": "6co2xSfZogeiDJE0Mc1mL3",
        "is_local": false,
        "name": "Vieni via",
        "popularity": 40,
        "preview_url": "https://p.scdn.co/mp3-preview/5a5111db60bfb8180431289ca59d3d71095319ac?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 2,
        "type": "track",
        "uri": "spotify:track:6co2xSfZogeiDJE0Mc1mL3"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/0WREDkJ6F8EelZQVUT6A5s"
          },
          "href": "https://api.spotify.com/v1/albums/0WREDkJ6F8EelZQVUT6A5s",
          "id": "0WREDkJ6F8EelZQVUT6A5s",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/92406734d46e4b34f336462894517d3f9d2e4a4b",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/54ac292b19a7af3378c5dc8c2aa0f7eeb8e07d58",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/5ed12e29cfa9ac562eb31785f1b3913d19c3b24c",
              "width": 64
            }
          ],
          "name": "Laska",
          "release_date": "2015-01-27",
          "release_date_precision": "day",
          "total_tracks": 13,
          "type": "album",
          "uri": "spotify:album:0WREDkJ6F8EelZQVUT6A5s"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 218440,
        "explicit": true,
        "external_ids": {
          "isrc": "ITZA81400212"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/6UHblA3IQ730jn1s3Nqv3O"
        },
        "href": "https://api.spotify.com/v1/tracks/6UHblA3IQ730jn1s3Nqv3O",
        "id": "6UHblA3IQ730jn1s3Nqv3O",
        "is_local": false,
        "name": "Faresti Con Me",
        "popularity": 40,
        "preview_url": null,
        "track_number": 4,
        "type": "track",
        "uri": "spotify:track:6UHblA3IQ730jn1s3Nqv3O"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6HuPZNzH3yKXr6LhEGt81Z"
          },
          "href": "https://api.spotify.com/v1/albums/6HuPZNzH3yKXr6LhEGt81Z",
          "id": "6HuPZNzH3yKXr6LhEGt81Z",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/06934fb2d631103a13e574c1c72a71aa71ede614",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/a05f6df48d59501b428a4ecd12189dfc71df6aeb",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/85d6f73a9bc0377e0b89172e65e586531c792c69",
              "width": 64
            }
          ],
          "name": "Lungomare Paranoia",
          "release_date": "2017-01-13",
          "release_date_precision": "day",
          "total_tracks": 12,
          "type": "album",
          "uri": "spotify:album:6HuPZNzH3yKXr6LhEGt81Z"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 232253,
        "explicit": false,
        "external_ids": {
          "isrc": "ITZA81600013"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/6VXisUdPxLHWbN9lkTuqK8"
        },
        "href": "https://api.spotify.com/v1/tracks/6VXisUdPxLHWbN9lkTuqK8",
        "id": "6VXisUdPxLHWbN9lkTuqK8",
        "is_local": false,
        "name": "71100",
        "popularity": 40,
        "preview_url": "https://p.scdn.co/mp3-preview/3b3c1e3a52bb5d2307fa00cc7c7e0cd52e3221f6?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 5,
        "type": "track",
        "uri": "spotify:track:6VXisUdPxLHWbN9lkTuqK8"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/0WREDkJ6F8EelZQVUT6A5s"
          },
          "href": "https://api.spotify.com/v1/albums/0WREDkJ6F8EelZQVUT6A5s",
          "id": "0WREDkJ6F8EelZQVUT6A5s",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/92406734d46e4b34f336462894517d3f9d2e4a4b",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/54ac292b19a7af3378c5dc8c2aa0f7eeb8e07d58",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/5ed12e29cfa9ac562eb31785f1b3913d19c3b24c",
              "width": 64
            }
          ],
          "name": "Laska",
          "release_date": "2015-01-27",
          "release_date_precision": "day",
          "total_tracks": 13,
          "type": "album",
          "uri": "spotify:album:0WREDkJ6F8EelZQVUT6A5s"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 245813,
        "explicit": true,
        "external_ids": {
          "isrc": "ITZA81400215"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/0lDDIgGH5NKBjs8EmUvLon"
        },
        "href": "https://api.spotify.com/v1/tracks/0lDDIgGH5NKBjs8EmUvLon",
        "id": "0lDDIgGH5NKBjs8EmUvLon",
        "is_local": false,
        "name": "Pace",
        "popularity": 39,
        "preview_url": null,
        "track_number": 7,
        "type": "track",
        "uri": "spotify:track:0lDDIgGH5NKBjs8EmUvLon"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "RO",
            "SE",
            "SG",
            "SK",
            "SV",
            "TH",
            "TR",
            "TW",
            "US",
            "UY",
            "VN",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6HuPZNzH3yKXr6LhEGt81Z"
          },
          "href": "https://api.spotify.com/v1/albums/6HuPZNzH3yKXr6LhEGt81Z",
          "id": "6HuPZNzH3yKXr6LhEGt81Z",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/06934fb2d631103a13e574c1c72a71aa71ede614",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/a05f6df48d59501b428a4ecd12189dfc71df6aeb",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/85d6f73a9bc0377e0b89172e65e586531c792c69",
              "width": 64
            }
          ],
          "name": "Lungomare Paranoia",
          "release_date": "2017-01-13",
          "release_date_precision": "day",
          "total_tracks": 12,
          "type": "album",
          "uri": "spotify:album:6HuPZNzH3yKXr6LhEGt81Z"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
        ],
        "disc_number": 1,
        "duration_ms": 107280,
        "explicit": false,
        "external_ids": {
          "isrc": "ITZA81600017"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/5unDcADEgwE5ppbXKH8dE3"
        },
        "href": "https://api.spotify.com/v1/tracks/5unDcADEgwE5ppbXKH8dE3",
        "id": "5unDcADEgwE5ppbXKH8dE3",
        "is_local": false,
        "name": "Superman",
        "popularity": 39,
        "preview_url": "https://p.scdn.co/mp3-preview/22b9dce999e32cbaf0a60dd344909e429e81beb4?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 9,
        "type": "track",
        "uri": "spotify:track:5unDcADEgwE5ppbXKH8dE3"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/0tTS475qIqv3KXYZMXjsYy"
              },
              "href": "https://api.spotify.com/v1/artists/0tTS475qIqv3KXYZMXjsYy",
              "id": "0tTS475qIqv3KXYZMXjsYy",
              "name": "Lorenzo Fragola",
              "type": "artist",
              "uri": "spotify:artist:0tTS475qIqv3KXYZMXjsYy"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/2M4XsKijWoVsPultAM3F1e"
          },
          "href": "https://api.spotify.com/v1/albums/2M4XsKijWoVsPultAM3F1e",
          "id": "2M4XsKijWoVsPultAM3F1e",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/f25994494db8132c6ad5c22f96b0d4e12ed48768",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/36654c45c48fc82c47ac07f29fceeb223d176d94",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ed80a4c176190437023bf4c8c299eefa05f140f6",
              "width": 64
            }
          ],
          "name": "Bengala",
          "release_date": "2018-04-27",
          "release_date_precision": "day",
          "total_tracks": 10,
          "type": "album",
          "uri": "spotify:album:2M4XsKijWoVsPultAM3F1e"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/0tTS475qIqv3KXYZMXjsYy"
            },
            "href": "https://api.spotify.com/v1/artists/0tTS475qIqv3KXYZMXjsYy",
            "id": "0tTS475qIqv3KXYZMXjsYy",
            "name": "Lorenzo Fragola",
            "type": "artist",
            "uri": "spotify:artist:0tTS475qIqv3KXYZMXjsYy"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/7gjqZ8coFZimZDtdk04WP1"
            },
            "href": "https://api.spotify.com/v1/artists/7gjqZ8coFZimZDtdk04WP1",
            "id": "7gjqZ8coFZimZDtdk04WP1",
            "name": "MACE",
            "type": "artist",
            "uri": "spotify:artist:7gjqZ8coFZimZDtdk04WP1"
          }
        ],
        "disc_number": 1,
        "duration_ms": 386630,
        "explicit": false,
        "external_ids": {
          "isrc": "ITB001800086"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/0epFYNfJTp8vUcK5ChYZdk"
        },
        "href": "https://api.spotify.com/v1/tracks/0epFYNfJTp8vUcK5ChYZdk",
        "id": "0epFYNfJTp8vUcK5ChYZdk",
        "is_local": false,
        "name": "Cemento",
        "popularity": 40,
        "preview_url": "https://p.scdn.co/mp3-preview/225d2acfa88e34ddfb66ffa70d0fdd0d2bc865b8?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 7,
        "type": "track",
        "uri": "spotify:track:0epFYNfJTp8vUcK5ChYZdk"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6HuPZNzH3yKXr6LhEGt81Z"
          },
          "href": "https://api.spotify.com/v1/albums/6HuPZNzH3yKXr6LhEGt81Z",
          "id": "6HuPZNzH3yKXr6LhEGt81Z",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/06934fb2d631103a13e574c1c72a71aa71ede614",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/a05f6df48d59501b428a4ecd12189dfc71df6aeb",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/85d6f73a9bc0377e0b89172e65e586531c792c69",
              "width": 64
            }
          ],
          "name": "Lungomare Paranoia",
          "release_date": "2017-01-13",
          "release_date_precision": "day",
          "total_tracks": 12,
          "type": "album",
          "uri": "spotify:album:6HuPZNzH3yKXr6LhEGt81Z"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "disc_number": 1,
        "duration_ms": 196746,
        "explicit": false,
        "external_ids": {
          "isrc": "ITZA81600012"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/0zP8GCX9at0Th7iEwxLNsV"
        },
        "href": "https://api.spotify.com/v1/tracks/0zP8GCX9at0Th7iEwxLNsV",
        "id": "0zP8GCX9at0Th7iEwxLNsV",
        "is_local": false,
        "name": "Malibu",
        "popularity": 38,
        "preview_url": "https://p.scdn.co/mp3-preview/dd9d0346005ff8f27cd7f80ba718ecf1f9fc1346?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 4,
        "type": "track",
        "uri": "spotify:track:0zP8GCX9at0Th7iEwxLNsV"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6HuPZNzH3yKXr6LhEGt81Z"
          },
          "href": "https://api.spotify.com/v1/albums/6HuPZNzH3yKXr6LhEGt81Z",
          "id": "6HuPZNzH3yKXr6LhEGt81Z",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/06934fb2d631103a13e574c1c72a71aa71ede614",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/a05f6df48d59501b428a4ecd12189dfc71df6aeb",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/85d6f73a9bc0377e0b89172e65e586531c792c69",
              "width": 64
            }
          ],
          "name": "Lungomare Paranoia",
          "release_date": "2017-01-13",
          "release_date_precision": "day",
          "total_tracks": 12,
          "type": "album",
          "uri": "spotify:album:6HuPZNzH3yKXr6LhEGt81Z"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "disc_number": 1,
        "duration_ms": 124133,
        "explicit": false,
        "external_ids": {
          "isrc": "ITZA81600009"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/189IPU4LDfQRGGWX4SqBCv"
        },
        "href": "https://api.spotify.com/v1/tracks/189IPU4LDfQRGGWX4SqBCv",
        "id": "189IPU4LDfQRGGWX4SqBCv",
        "is_local": false,
        "name": "Acque profonde",
        "popularity": 37,
        "preview_url": "https://p.scdn.co/mp3-preview/1e74d1d34da17b95b0a13d12c4981a9aa80760b8?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:189IPU4LDfQRGGWX4SqBCv"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6HuPZNzH3yKXr6LhEGt81Z"
          },
          "href": "https://api.spotify.com/v1/albums/6HuPZNzH3yKXr6LhEGt81Z",
          "id": "6HuPZNzH3yKXr6LhEGt81Z",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/06934fb2d631103a13e574c1c72a71aa71ede614",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/a05f6df48d59501b428a4ecd12189dfc71df6aeb",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/85d6f73a9bc0377e0b89172e65e586531c792c69",
              "width": 64
            }
          ],
          "name": "Lungomare Paranoia",
          "release_date": "2017-01-13",
          "release_date_precision": "day",
          "total_tracks": 12,
          "type": "album",
          "uri": "spotify:album:6HuPZNzH3yKXr6LhEGt81Z"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "duration_ms": 194560,
        "explicit": false,
        "external_ids": {
          "isrc": "ITZA81600020"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/4DV0kAnjWv4nNCVCpPhhun"
        },
        "href": "https://api.spotify.com/v1/tracks/4DV0kAnjWv4nNCVCpPhhun",
        "id": "4DV0kAnjWv4nNCVCpPhhun",
        "is_local": false,
        "name": "Buon compleanno",
        "popularity": 37,
        "preview_url": "https://p.scdn.co/mp3-preview/05a4bd35e58948d33f3cddfca2e2ec24bee47126?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 12,
        "type": "track",
        "uri": "spotify:track:4DV0kAnjWv4nNCVCpPhhun"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6HuPZNzH3yKXr6LhEGt81Z"
          },
          "href": "https://api.spotify.com/v1/albums/6HuPZNzH3yKXr6LhEGt81Z",
          "id": "6HuPZNzH3yKXr6LhEGt81Z",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/06934fb2d631103a13e574c1c72a71aa71ede614",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/a05f6df48d59501b428a4ecd12189dfc71df6aeb",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/85d6f73a9bc0377e0b89172e65e586531c792c69",
              "width": 64
            }
          ],
          "name": "Lungomare Paranoia",
          "release_date": "2017-01-13",
          "release_date_precision": "day",
          "total_tracks": 12,
          "type": "album",
          "uri": "spotify:album:6HuPZNzH3yKXr6LhEGt81Z"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "duration_ms": 270746,
        "explicit": false,
        "external_ids": {
          "isrc": "ITZA81600011"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/0Hga6oTwBk0qvI3ziHUGHp"
        },
        "href": "https://api.spotify.com/v1/tracks/0Hga6oTwBk0qvI3ziHUGHp",
        "id": "0Hga6oTwBk0qvI3ziHUGHp",
        "is_local": false,
        "name": "Infinito",
        "popularity": 37,
        "preview_url": "https://p.scdn.co/mp3-preview/1f74a742b585c82ac5526d7384336919854ddd12?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 3,
        "type": "track",
        "uri": "spotify:track:0Hga6oTwBk0qvI3ziHUGHp"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
      
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6HuPZNzH3yKXr6LhEGt81Z"
          },
          "href": "https://api.spotify.com/v1/albums/6HuPZNzH3yKXr6LhEGt81Z",
          "id": "6HuPZNzH3yKXr6LhEGt81Z",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/06934fb2d631103a13e574c1c72a71aa71ede614",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/a05f6df48d59501b428a4ecd12189dfc71df6aeb",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/85d6f73a9bc0377e0b89172e65e586531c792c69",
              "width": 64
            }
          ],
          "name": "Lungomare Paranoia",
          "release_date": "2017-01-13",
          "release_date_precision": "day",
          "total_tracks": 12,
          "type": "album",
          "uri": "spotify:album:6HuPZNzH3yKXr6LhEGt81Z"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
  
        "duration_ms": 290120,
        "explicit": false,
        "external_ids": {
          "isrc": "ITZA81600015"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/5fr89cPPIPty0XAoHaDZ4A"
        },
        "href": "https://api.spotify.com/v1/tracks/5fr89cPPIPty0XAoHaDZ4A",
        "id": "5fr89cPPIPty0XAoHaDZ4A",
        "is_local": false,
        "name": "Labirinto",
        "popularity": 36,
        "preview_url": "https://p.scdn.co/mp3-preview/ab645ee0ad3ee5b3d3440aef7c1822d69ce5046c?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 7,
        "type": "track",
        "uri": "spotify:track:5fr89cPPIPty0XAoHaDZ4A"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
  
          "external_urls": {
            "spotify": "https://open.spotify.com/album/6HuPZNzH3yKXr6LhEGt81Z"
          },
          "href": "https://api.spotify.com/v1/albums/6HuPZNzH3yKXr6LhEGt81Z",
          "id": "6HuPZNzH3yKXr6LhEGt81Z",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/06934fb2d631103a13e574c1c72a71aa71ede614",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/a05f6df48d59501b428a4ecd12189dfc71df6aeb",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/85d6f73a9bc0377e0b89172e65e586531c792c69",
              "width": 64
            }
          ],
          "name": "Lungomare Paranoia",
          "release_date": "2017-01-13",
          "release_date_precision": "day",
          "total_tracks": 12,
          "type": "album",
          "uri": "spotify:album:6HuPZNzH3yKXr6LhEGt81Z"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          }
        ],
        "disc_number": 1,
        "duration_ms": 252893,
        "explicit": false,
        "external_ids": {
          "isrc": "ITZA81600018"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/5rAFuBY24ApqIjJb8iO4rw"
        },
        "href": "https://api.spotify.com/v1/tracks/5rAFuBY24ApqIjJb8iO4rw",
        "id": "5rAFuBY24ApqIjJb8iO4rw",
        "is_local": false,
        "name": "Non serve",
        "popularity": 36,
        "preview_url": "https://p.scdn.co/mp3-preview/7e094a0b24ac8cd81996a02fc3f209569ad02eea?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 10,
        "type": "track",
        "uri": "spotify:track:5rAFuBY24ApqIjJb8iO4rw"
      },
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
              },
              "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
              "id": "4yUvIAm9mSJyLt1WLrOxAZ",
              "name": "Mecna",
              "type": "artist",
              "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
            }
          ],
  
          "external_urls": {
            "spotify": "https://open.spotify.com/album/0WREDkJ6F8EelZQVUT6A5s"
          },
          "href": "https://api.spotify.com/v1/albums/0WREDkJ6F8EelZQVUT6A5s",
          "id": "0WREDkJ6F8EelZQVUT6A5s",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/92406734d46e4b34f336462894517d3f9d2e4a4b",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/54ac292b19a7af3378c5dc8c2aa0f7eeb8e07d58",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/5ed12e29cfa9ac562eb31785f1b3913d19c3b24c",
              "width": 64
            }
          ],
          "name": "Laska",
          "release_date": "2015-01-27",
          "release_date_precision": "day",
          "total_tracks": 13,
          "type": "album",
          "uri": "spotify:album:0WREDkJ6F8EelZQVUT6A5s"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4yUvIAm9mSJyLt1WLrOxAZ"
            },
            "href": "https://api.spotify.com/v1/artists/4yUvIAm9mSJyLt1WLrOxAZ",
            "id": "4yUvIAm9mSJyLt1WLrOxAZ",
            "name": "Mecna",
            "type": "artist",
            "uri": "spotify:artist:4yUvIAm9mSJyLt1WLrOxAZ"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/3av6zIgtT4g0kjJtDybSdb"
            },
            "href": "https://api.spotify.com/v1/artists/3av6zIgtT4g0kjJtDybSdb",
            "id": "3av6zIgtT4g0kjJtDybSdb",
            "name": "Johnny Marsiglia",
            "type": "artist",
            "uri": "spotify:artist:3av6zIgtT4g0kjJtDybSdb"
          }
        ],
        "disc_number": 1,
        "duration_ms": 180706,
        "explicit": true,
        "external_ids": {
          "isrc": "ITZA81400220"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/0KkMntaTiBcHLfsrJ2yGkp"
        },
        "href": "https://api.spotify.com/v1/tracks/0KkMntaTiBcHLfsrJ2yGkp",
        "id": "0KkMntaTiBcHLfsrJ2yGkp",
        "is_local": false,
        "name": "09:30",
        "popularity": 36,
        "preview_url": null,
        "track_number": 12,
        "type": "track",
        "uri": "spotify:track:0KkMntaTiBcHLfsrJ2yGkp"
      }
    ],
    "limit": 20,
    "next": "https://api.spotify.com/v1/search?query=mecna&type=track&market=IT&offset=20&limit=20",
    "offset": 0,
    "previous": null,
    "total": 100
  }
};

const API = {
    search: 'https://api.spotify.com/v1/search?q=',
    login:  `https://accounts.spotify.com/authorize?response_type=code` +
            `&client_id=${CLIENT_ID}&scopes=${encodeURIComponent(SCOPES)}&redirect_uri=${encodeURIComponent(CLIENT_CALLBACK_URL)}`
}

const options : InAppBrowserOptions = {
  location : 'yes',//Or 'no' 
  hidden : 'no', //Or  'yes'
  clearcache : 'yes',
  clearsessioncache : 'yes',
  zoom : 'yes',//Android only ,shows browser zoom controls 
  hardwareback : 'yes',
  mediaPlaybackRequiresUserAction : 'no',
  shouldPauseOnSuspend : 'no', //Android only 
  closebuttoncaption : 'Close', //iOS only
  disallowoverscroll : 'no', //iOS only 
  toolbar : 'yes', //iOS only 
  enableViewportScale : 'no', //iOS only 
  allowInlineMediaPlayback : 'no',//iOS only 
  presentationstyle : 'pagesheet',//iOS only 
  fullscreen : 'yes',//Windows only    
};

const SPOTIFY_SERVICE_HOST = ''
export class SpotifyService{

access_token  : string
refresh_token : string
expire_time   : string

constructor( private http: HttpClient,
             private theInAppBrowser: InAppBrowser,
             private storage: Storage){
    
}


login(){
  let target = "_self"; // _blank, _self , _system
  alert('hehehe')
  this.theInAppBrowser.create(API.login,target,options);
}

handleCallback(code: string){
    this.storage.set('spotify.code', code);
    this.http.post(SPOTIFY_SERVICE_HOST + '/exchange', config).subscribe(data=>{
        this.access_token   = data['access_token'];
        this.refresh_token  = data['refresh_token'];
        this.expire_time    = data['expire_time'];
        this.storage.set('spotify.access_token', data['access_token']);
        this.storage.set('spotify.refresh_token', data['refresh_token']);
        this.storage.set('spotify.expire_time', data['expire_time']);
        alert(this.access_token)
    });
}


getAccessToken(){
    if(!this.access_token){
      this.storage.get('spotify.access_token').then(token=>{
        this.access_token = token;
        return this.access_token;
      });
    }
}

search(text){
   return this.http.get(API.search + encodeURIComponent(text.trim()), this.getHeaders());
}


parseItem(response){

}

getHeaders(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authentication', `Bearer ${this.getAccessToken()}`);
    return { headers: headers };
}
































}
__path = process.cwd()
var favicon = require('serve-favicon');
var express = require('express');
var db = require(__path + '/database/db');
try {
var zahirr = db.get("zahirr");
} catch (e) {
	console.log('')  
}
 
var creator = "alpin"
var secure = require('ssl-express-www');
var cors = require('cors');
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var request = require('request');
var zrapi = require("zrapi");
var dotenv = require("dotenv").config()
var fs = require('fs');
var TikTokScraper = require('tiktok-scraper');
var { EmojiAPI } = require("emoji-api");
var emoji = new EmojiAPI();
var router  = express.Router();
var { color, bgcolor } = require(__path + '/lib/color.js');
var { fetchJson } = require(__path + '/lib/fetcher.js');
var options = require(__path + '/lib/options.js');
var {
	Searchnabi,
	Gempa
} = require('./../lib');

var {
  pShadow,
  pRomantic,
  pSmoke,
  pBurnPapper,
  pNaruto,
  pLoveMsg,
  pMsgGrass,
  pGlitch,
  pDoubleHeart,
  pCoffeCup,
  pLoveText,
  pButterfly
} = require("./../lib/utils/photooxy");

var {
  igStalk,
  igDownload
} = require("./../lib/utils/ig");

var {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("./../lib/utils/yt");

var { 
  Joox, 
  FB, 
  Tiktok
} = require("./../lib/utils/downloader");

var {
  Cuaca, 
  Lirik
} = require('./../lib/utils/information');

var {
  Base, 
  WPUser
} = require('./../lib/utils/tools');

var tebakGambar = require('./../lib/utils/tebakGambar');

var cookie = process.env.COOCKIE
/*
* @Pesan Error
*/
loghandler = {
    notparam: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter apikey'
    },
    noturl: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter url'
    },
    notquery: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan parameter query'
        },
    notkata: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter kata'
    },
    nottext: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text'
    },
    nottext2: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text2'
    },
    notnabi: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter nabi'
    },
    nottext3: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text3'
    },
    nottheme: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter theme'
    },
    notusername: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter username'
    },
    notvalue: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter value'
    },
    invalidKey: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'apikey invalid'
    },
    invalidlink: {
        status: false,
        creator: `${creator}`,
        message: 'error, mungkin link anda tidak valid.'
    },
    invalidkata: {
        status: false,
        creator: `${creator}`,
        message: 'error, mungkin kata tidak ada dalam api.'
    },
    error: {
        status: false,
        creator: `${creator}`,
        message: 'emror bruh'
    }
}

/*
Akhir Pesan Error
*/

router.use(favicon(__path + "/views/favicon.ico"));

const listkey = ["alpin1", "alpin1"];

router.post("/apikey", async (req, res, next) => {
  const key = req.query.key;
  if(listkey.includes(key)) {
    res.json({
      message: 'apikey sudah terdaftar'
    });
  } else {
    listkey.push(key);
    res.json({
      message: `berhasil mendaftarkan ${key} Kedatabase apikey`
    });
  }
});

// delete apikey

router.delete("/apikey", async(req, res, next) => {
	const key = req.query.delete;
	if(listkey.includes(key)) {
		res.json({
			message: 'apikey tidak ada sebelumnya'
			})
			} else {
	listkey.splice(key, 1)
	res.json({
		message: 'apikey berhasil dihapus' 
});
 }
});

router.get('/music/joox', async(req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;
  
  if(!query) return res.json(loghandler.notquery)
  if(!apikey) return res.json(loghandler.notparam)
  
  if(listkey.includes(apikey)){
  Joox(query)
  .then((result) => {
  res.json(result)
    res.json(result)
  });
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/music/spotify', async(req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  if(!apikey) return res.json(loghandler.notparam)
  if(!query) return res.json(loghandler.notquery)
  
  if(listkey.includes(apikey)){
  fetch(encodeURI(`https://alpin-api-2021.herokuapp.com/api/spotify?apikey=alpin1&q=${query}`))
  .then(response => response.json())
        .then(hasil => {

        var result = hasil.data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
  res.json(loghandler.invalidKey)
}
})
router.get('/download/ytmp3', async(req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if(!url) return res.json(loghandler.noturl)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  ytDonlodMp3(url)
    .then((result) => {
      res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result
      })
    })
    .catch((error) => {
      console.log(error)
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get('/download/ytmp4', async(req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;

  if(!url) return res.json(loghandler.noturl)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  ytDonlodMp4(url)
    .then((result) => {
      res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result
      })
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/yt/playmp3", async(req, res, next) => {
    const query = req.query.query;
    const apikey = req.query.apikey;
    
    if(!query) return res.json(loghandler.notquery)
    if(!apikey) return res.json(loghandler.notparam)
    if(listkey.includes(apikey)){
    ytPlayMp3(query)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        });
      } else {
      res.json(loghandler.invalidKey)
      }
});

router.get("/yt/playmp4", async(req, res, next) => {

    const query = req.query.query;

    const apikey = req.query.apikey;
    
    if(!query) return res.json(loghandler.notquery)
    if(!apikey) return res.json(loghandler.notparam)
    if(listkey.includes(apikey)){
    ytPlayMp4(query)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        });
      } else {
      res.json(loghandler.invalidKey)
      }
});


router.get('/yt/search', async(req, res, next) => {
    const query = req.query.query;
    const apikey = req.query.apikey;
    
    if(!query) return res.json(loghandler.notquery)
    if(!apikey) return res.json(loghandler.notparam)
    if(listkey.includes(apikey)){
    ytSearch(query)
        .then((result) => {
            res.json({
              status: true,
              code: 200,
              creator: `${creator}`,
              result
            })
        })
        .catch((error) => {
            res.json(error);
        });
      } else {
     res.json(loghandler.invalidKey)
     }
});

router.get('/download/tiktok', async (req, res, next) => {
    var Apikey = req.query.apikey,
        url = req.query.url

	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
     if (!url) return res.json(loghandler.noturl)
     Tiktok(url)
     .then((data) => {
       res.json(data)
     })
    } else {
res.json(loghandler.invalidKey)
}
})

router.get('/download/ig', async(req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if(!url) return res.json(loghandler.noturl)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  igDownload(url)
    .then((data) => {
      result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        id: data.id,
        shortCode: data.shortCode,
        caption: data.caption,
        result: data.url
      }
      res.json(result)
    })
    .catch((err) => {
      res.json(err);
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get('/download/fb', async (req, res, next) => {

        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
    if (!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       FB(url)
       .then((data) => {
         res.json({
           status: true,
           code: 200,
           creator: `${creator}`,
           title: data.title,
           desc: data.deskripsi,
           durasi: data.durasi,
           thumb: data.thumbnail,
           result: data.hd
         })
       });
} else {
res.json(loghandler.invalidKey)
}
});

router.get('/stalk/tiktok', async (req, res, next) => {
    var Apikey = req.query.apikey,
        username = req.query.username

	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
    if (!username) return res.json(loghandler.notusername)


    TikTokScraper.getUserProfileInfo(username)
        .then(user => {
            res.json({
                status : true,
                creator : `${creator}`,
                result : user
            })
        })
        .catch(e => {
             res.json({
                 status : false,
                 creator : `${creator}`,
                 message : "error, mungkin username anda tidak valid"
             })
         })
   } else {
res.json(loghandler.invalidKey)
}
})

router.get('/stalk/ig', async(req, res, next) => {
  const username = req.query.username;
  const apikey = req.query.apikey;
  if(!username) return res.json(loghandler.notusername)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  igStalk(username)
    .then((result) => {
      res.json({
        status : true,
        code: 200,
        creator : `${creator}`,
        result
      });
    })
    .catch((err) => {
      res.json(err);
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});


router.get('/stalk/npm', async (req, res, next) => {
        var Apikey = req.query.apikey,
            query = req.query.query
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
    if (!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://registry.npmjs.org/${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/random/quotes', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://python-api-zhirrr.herokuapp.com/api/random/quotes`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/jadwal-bioskop', async(req, res, next) => {
var Apikey = req.query.apikey

if(!Apikey) return res.json(loghandler.notparam)
if(listkey.includes(Apikey)){
const { default: Axios } = require('axios')
const cheerio = require('cheerio')

Axios.get('https://jadwalnonton.com/now-playing')
.then(({ data }) => {
     const $ = cheerio.load(data)
     let title = []
     let url = []
     let img = []
 	$('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a').get().map((rest) => {
         url.push($(rest).attr('href'))
         })
         $('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a > img').get().map((rest) => {
        	title.push($(rest).attr('alt'))
         })
         $('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a > img').get().map((rest) => {
        	img.push($(rest).attr('src'))
         })
     let result = []
     for (let i = 0; i < url.length; i++) {
          result.push({
               	url: url[i],
               	title: title[i],
               	img: img[i]
          })
     }
     res.json({
     creator:  `${creator}`,
     status: true,
     result: result
     })
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/short/tinyurl', async (req, res, next) => {
    var Apikey = req.query.apikey,
        url = req.query.url

	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
     if (!url) return res.json(loghandler.noturl)
     request(`https://tinyurl.com/api-create.php?url=${url}`, function (error, response, body) {
         try {
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result : `${body}`
             })
         } catch (e) {
             console.log('Error :', color(e,'red'))
             res.json(loghandler.invalidlink)
         }
     })
   } else {
res.json(loghandler.invalidKey)
}
})

router.get('/base', async (req, res, next) => {
	var type = req.query.type,
		encode = req.query.encode,
		decode = req.query.decode,
		Apikey = req.query.apikey;
		if (!Apikey) return res.json(loghandler.notparam)
		if (listkey.includes(Apikey)){
		if (!type) return res.json({status: false, creator, code: 404, message: 'masukan parameter type, type yang tersedia : base64 , base32'})
		if (type == 'base64' && encode){
				Base("b64enc", encode)
				.then(result => {
					res.json({
						status:true,
						creator: `${creator}`,
						result
					})
				})
			} else if (type == 'base64' && decode){
				Base("b64dec", decode)
				.then(result => {
					res.json({
						status: true,
						creator: `${creator}`,
						result
					})
				})
			} else if (type == 'base32' && encode){
				Base('b32enc', encode)
				.then(result => {
					res.json({
						status:true,
						creator: `${creator}`,
						result
					})
				})
			} else if (type == 'base32' && decode){
				Base('b32dec', decode)
				.then(result => {
					res.json({
						status:true,
						creator: `${creator}`,
						result
					})
				})
			} else if(!(encode || decode)){
				res.json({
					status:false,
					creator: `${creator}`,
					message: "tambahkan parameter encode/decode"
				})
			} else {
				res.json(loghandler.error)
			}
	} else {
res.json(loghandler.invalidKey)
}
});

router.get('/tools/wpuser', async(req, res, next) => {
  const link = req.query.url;
  const apikey = req.query.apikey;
  
  if(!link) return res.json(loghandler.noturl)
  if(!apikey) return res.json(loghandler.notparam)
  
  if(listkey.includes(apikey)) {
    WPUser(link)
    .then((data) => {
      res.json(data)
    })
} else {
  res.json(loghandler.invalidKey)
};
});

router.get('/info/cuaca', async(req, res, next) => {
  const apikey = req.query.apikey;
  const kota = req.query.kota;
  
  if(!apikey) return res.json(loghandler.notparam)
  if(!kota) return res.json({status: false, code: 406, message: 'masukkan parameter kota'})
  if(listkey.includes(apikey)) {
    Cuaca(kota)
    .then((data) => {
      res.json(data)
    })
  } else {
    res.json(loghandler.invalidKey)
  }
})
router.get('/info/gempa', async (req, res, next) => {
	        var Apikey = req.query.apikey

		if (!Apikey) return res.json(loghandler.notparam)
		if (listkey.includes(Apikey)){
		Gempa()
		.then(result => {
			res.json({
				creator: creator,
				result
			})
		})
		.catch(e => {
			console.log('Error :', color(e, 'red'))
			res.json(loghandler.error)
		})
	} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/kisahnabi', async (req, res, next) => {
	var nabi = req.query.nabi,
		Apikey = req.query.apikey;

		if (!Apikey) return res.json(loghandler.notparam)
		if (listkey.includes(Apikey)){
		Searchnabi(nabi)
		.then(result => {
			res.json({
				creator: creator,
				result
			})
		})
		.catch(e => {
			console.log('Error :', color(e, 'red'))
			res.json(loghandler.error)
		})
	} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/hadits', async (req, res, next) => {
        var Apikey = req.query.apikey,
            kitab = req.query.kitab,
            nomor = req.query.nomor
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
    if (!kitab) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kitab"})
    if (!nomor) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nomor"})

       fetch(encodeURI(`https://hadits-api-zhirrr.vercel.app/books/${kitab}/${nomor}`))
        .then(response => response.json())
        .then(data => {
             res.json(
             data
             )
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/quran', async (req, res, next) => {
        var Apikey = req.query.apikey,
            surah = req.query.surah,
            ayat = req.query.ayat
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
    if (!surah) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter surah"})
    if (!ayat) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter ayat"})

       fetch(encodeURI(`https://alquran-apiii.vercel.app/surah/${surah}/${ayat}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/muslim/tahlil', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataTahlil.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/wirid', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataWirid.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/ayatkursi', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataAyatKursi.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/doaharian', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataDoaHarian.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/bacaanshalat', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataBacaanShalat.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/niatshalat', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataNiatShalat.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/kisahnabi', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataKisahNabi.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/asmaulhusna', async (req, res, next) => {
        var Apikey = req.query.apikey

	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

	asmaul = JSON.parse(fs.readFileSync(__path +'/data/AsmaulHusna.json'));
	res.json(asmaul)
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/niatshubuh', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatShubuh.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/niatdzuhur', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatDzuhur.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/niatmaghrib', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatMaghrib.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/niatisya', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatIsya.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/niatashar', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatAshar.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})
router.get('/muslim/jadwalshalat', async (req, res, next) => {
        var Apikey = req.query.apikey,
            kota = req.query.kota
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
        if(!kota) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kota"})

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/Zhirrr-Database/main/adzan/${kota}/2021/03.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/search/image', async(req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  
  if(!query) return res.json(loghandler.notquery)
  if(!apikey) return res.json(loghandler.notparam)
  
  if(listkey.includes(apikey)){
    try {
        var options = {
            url: `http://results.dogpile.com/serp?qc=images&q=${query}`,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function(error, response, responseBody) {
            if (error) return

            $ = cheerio.load(responseBody)
            var links = $(".image a.link")
            var cari = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"))
            if (!cari.length) return
            var hasil = cari[Math.floor(Math.random() * cari.length)]
        res.json({
              status: true,
              code: 200,
              creator: `${creator}`,
              result: hasil
            })
        })
    } catch (e) {}
  } else {
    res.json(loghandler.invalidKey)
  }
})
router.get('/wallpaper/cyberspace', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

  Cc = JSON.parse(fs.readFileSync(__path +'/data/CyberSpace.json'));
  const randCc = Cc[Math.floor(Math.random() * Cc.length)]
  data = await fetch(randCc).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/CyberSpace.jpeg', data)
  res.sendFile(__path +'/tmp/CyberSpace.jpeg')
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/wallpaper/teknologi', async (req, res, next) => {
        const Apikey = req.query.apikey;
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

const Techno = JSON.parse(fs.readFileSync(__path +'/data/Technology.json'))
const randTech = Techno[Math.floor(Math.random() * Techno.length)]
//tansole.log(randTech)
data = await fetch(randTech).then(v => v.buffer())
await fs.writeFileSync(__path +'/tmp/techno.jpeg', data)
res.sendFile(__path +'/tmp/techno.jpeg')
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/wallpaper/muslim', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

  const Muslim = JSON.parse(fs.readFileSync(__path +'/data/Islamic.json'));
  const randMuslim = Muslim[Math.floor(Math.random() * Muslim.length)];
  data = await fetch(randMuslim).then(v => v.buffer());
  await fs.writeFileSync(__path +'/tmp/muslim.jpeg', data)
  res.sendFile(__path +'/tmp/muslim.jpeg');
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/wallpaper/programming', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

  const Progam = JSON.parse(fs.readFileSync(__path +'/data/Programming.json'));
  const randProgam = Progam[Math.floor(Math.random() * Progam.length)];
  data = await fetch(randProgam).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/Programming.jpeg', data)
  res.sendFile(__path +'/tmp/Programming.jpeg')
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/wallpaper/pegunungan', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

  const Mount = JSON.parse(fs.readFileSync(__path +'/data/Mountain.json'));
  const randMount = Mount[Math.floor(Math.random() * Mount.length)];
  data = await fetch(randMount).then(v => v.buffer());
  await fs.writeFileSync(__path +'/tmp/Mountain.jpeg', data)
  res.sendFile(__path+ '/tmp/Mountain.jpeg');
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/random/quotes/muslim', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/quote?type=agamis`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/random/asmaulhusna', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://python-api-zhirrr.herokuapp.com/api/random/asmaulhusna`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/info/wikipedia', async (req, res, next) => {
        var Apikey = req.query.apikey,
            search = req.query.search
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
        if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})

       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/wiki?keyword=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/info/drakorasia', async (req, res, next) => {
        var Apikey = req.query.apikey,
            search = req.query.search
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
        if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})

       fetch(encodeURI(`http://docs-api-zahirrr.herokuapp.com/api/drakorasia?search=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/fakedata', async (req, res, next) => {
        var Apikey = req.query.apikey,
            country = req.query.country
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
        if(!country) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter country"})

       fetch(encodeURI(`https://fakename-api-zhirrr.vercel.app/api/fakename?country=${country}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/hilih', async (req, res, next) => {
        var Apikey = req.query.apikey,
            kata = req.query.kata
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
        if(!kata) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kata"})

       fetch(encodeURI(`https://hilih-api-zhirrr.vercel.app/api/hilih?kata=${kata}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/music/liriklagu', async (req, res, next) => {
        var Apikey = req.query.apikey,
            lagu = req.query.query;
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
        if(!lagu) return res.json(loghandler.notquery)
        Lirik(lagu)
        .then((lirik) => {
          res.json({
            status: true,
            code: 200,
            creator: `${creator}`,
            result: lirik.data
          })
        });
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/music/chordlagu', async (req, res, next) => {
        var Apikey = req.query.apikey,
            lagu = req.query.lagu
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
        if(!lagu) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kata"})

       fetch(encodeURI(`https://python-api-zhirrr.herokuapp.com/api/chord?q=${lagu}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/info/kbbi', async (req, res, next) => {
        var Apikey = req.query.apikey,
            kata = req.query.kata
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
        if(!kata) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kata"})

       fetch(encodeURI(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${kata}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/info/covidindo', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://covid19-api-zhirrr.vercel.app/api/covid-indonesia`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/info/covidworld', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://covid19-api-zhirrr.vercel.app/api/world`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/random/meme', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/meme`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/info/kodepos', async (req, res, next) => {
        var Apikey = req.query.apikey,
	    kota = req.query.kota
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
	if(!kota) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kota"})

       fetch(encodeURI(`https://kodepos-api-zhirrr.vercel.app/?q=${kota}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/translate', async (req, res, next) => {
        var Apikey = req.query.apikey,
	    kata = req.query.kata
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
	if(!kata) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kata"})
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/translate?text=${kata}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/anime/kusonime', async (req, res, next) => {
        var Apikey = req.query.apikey,
	    search = req.query.search
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
	if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/kusonime?search=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/anime/loli', async(req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.notparam)
    if(listkey.includes(apikey)){
    try {
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q= " + "Loli",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function(error, response, responseBody) {
            if (error) return

            $ = cheerio.load(responseBody)
            var links = $(".image a.link")
            var cari = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"))
            if (!cari.length) return
            var hasil = cari[Math.floor(Math.random() * cari.length)]
        res.json({
              status: true,
              code: 200,
              creator: `${creator}`,
              result: hasil
            })
        })
    } catch (e) {}
    } else {
      res.json(loghandler.invalidKey)
    }
});


router.get('/anime/manga', async (req, res, next) => {
        var Apikey = req.query.apikey,
	    search = req.query.search
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
	if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/manga?keyword=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/kuis/caklontong', async (req, res, next) => {
        var Apikey = req.query.apikey
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/quote?type=caklontong`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/kuis/tebakGambar', async (req, res, next) => {
  var apikey = req.query.apikey;
  
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  let result = await tebakGambar()
  if (result) {
    const hasil = {
      status: true,
      code: 200,
      creator: `${creator}`,
      image: result.img,
      jawaban: result.jawaban,
      clue: result.petunjuk
    }
    res.json(hasil)
  } else {
    return res.status(408).json({
      status: res.statusCode,
      error: 'Emror'
    })
  }
  } else {
  res.json(loghandler.invalidKey)
  }
})

/**
* @Maker
**/



router.get("/photooxy/shadow", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pShadow(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/romantic", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pRomantic(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

// @PHOTOOXY

router.get("/photooxy/smoke", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pSmoke(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/burn-papper", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pBurnPapper(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/naruto", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pNaruto(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/love-message", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pLoveMsg(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/message-under-grass", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pMsgGrass(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/glitch", async(req, res, next) => {
  const text1 = req.query.text1;
  const text2 = req.query.text2;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!text2) return res.json(loghandler.nottext2)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pGlitch(text1, text2)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/double-heart", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pDoubleHeart(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/coffe-cup", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pCoffeCup(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/love-text", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pLoveText(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/butterfly", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pButterfly(text1)
  .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(loghandler.error)
    })
    } else {
    	res.json(loghandler.invalidKey)
    }
});

/*
@ AKHIR PHOTOOXY
*/
/*
@ TEXTPROME
*/
router.get('/textpro/logo-wolf', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  const text2 = req.query.text2;
  
  if(!apikey) return res.json(loghandler.notparam)
  if(!text) return res.json(loghandler.nottext)
  if(!text2) return res.json(loghandler.nottext2)
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-wolf-logo-black-white-937.html", [
    text, text2
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/textpro/natural-leaves', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.json(loghandler.notparam)
  if(!text) return res.json(loghandler.nottext)
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/natural-leaves-text-effect-931.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/textpro/logo-wolf2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if(!apikey) return res.json(loghandler.notparam)
  if(!text) return res.json(loghandler.nottext)
  if(!text2) return res.json(loghandler.nottext2)
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-wolf-logo-galaxy-online-936.html", [
    text, text2
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/textpro/logo-wolf', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if(!apikey) return res.json(loghandler.notparam)
  if(!text) return res.json(loghandler.nottext)
  if(!text2) return res.json(loghandler.nottext2)
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/matrix-style-text-effect-online-884.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/textpro/logo-wolf', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if(!apikey) return res.json(loghandler.notparam)
  if(!text) return res.json(loghandler.nottext)
  if(!text2) return res.json(loghandler.nottext2)
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/firework-sparkle-text-effect-930.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/textpro/thunder', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if(!apikey) return res.json(loghandler.notparam)
  if(!text) return res.json(loghandler.nottext)
  if(!text2) return res.json(loghandler.nottext2)
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/thunder-text-effect-online-881.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/textpro/black-pink', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.json(loghandler.notparam)
  if(!text) return res.json(loghandler.nottext)
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/textpro/drop-water', async(req, res, next) => {



  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.json(loghandler.notparam)
  if(!text) return res.json(loghandler.nottext)
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/dropwater-text-effect-872.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/textpro/christmas', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.json(loghandler.notparam)
  if(!text) return res.json(loghandler.nottext)
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-a-christmas-holiday-snow-text-effect-1007.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/textpro/3d-gradient', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  
  if(!apikey) return res.json(loghandler.notparam)
  if(!text) return res.json(loghandler.nottext)
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/3d-gradient-text-effect-online-free-1002.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/textpro/porn-hub', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text1;
  const text2 = req.query.text2;
  
  if(!apikey) return res.json(loghandler.notparam)
  if(!text) return res.json(loghandler.nottext1)
  if(!text2) return res.json(loghandler.nottext2)
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", [
    text, text2
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.json(loghandler.invalidKey)
  }
});

/*
@AKHIR TEXTPRO ME
*/

router.get('/maker/dadu', async (req, res, next) => {
  Apikey = req.query.apikey;

  if(!Apikey) return res.json(loghandler.notparam)
  if(listkey.includes(Apikey)) {
      random = Math.floor(Math.random() * 6) + 1
      hasil = 'https://www.random.org/dice/dice' + random + '.png'
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/dadu.png', data)
        res.sendFile(__path+'/tmp/dadu.png')
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/asupan', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.json(loghandler.notparam)
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/asupan.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.asupan;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.mp4', data)
    res.sendFile(__path +'/tmp/asupan.mp4')
  } else {
    res.json(loghandler.invalidKey)
  }
});
 
router.get("/maker/nulis", async (req, res, next) => {
  
  apikey = req.query.apikey;
  text = req.query.text;
  
  if(!text) return res.json(loghandler.nottext)
  if(!apikey) return res.json(loghandler.notparam)
  
  if(listkey.includes(apikey)) {
    let hasil = 'https://api.zeks.xyz/api/nulis?text='+ text +'&apikey=apivinz' 
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/nulis.jpeg', data)
    res.sendFile(__path +'/tmp/nulis.jpeg')
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/maker/ttp', async (req, res, next) => {

  Apikey = req.query.apikey;
  if (!req.query.text) return res.json({ status: 404, error: 'masukkan parameter text'})
  if(!Apikey) return res.json(loghandler.notparam)
  if(listkey.includes(Apikey)) {
  random = new Date
data = await fetch(`https://api.areltiyan.site/sticker_maker?text=${encodeURIComponent(req.query.text)}`).then(v => v.json())
         base64 = data.base64
         var buffer = base64.slice(22)
         await fs.writeFileSync(__path +`/tmp/ttp.png`, buffer, 'base64')
        res.sendFile(__path+'/tmp/ttp.png')
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/maker/attp', async(req, res, next) => {

  const text = req.query.text;
  const apikey = req.query.apikey;
  if(!text) return res.json(loghandler.nottext)
  if(!apikey) return res.json(loghandler.notparam)
  
  if(listkey.includes(apikey)) {
  let hasil = 'https://alpin-api-2021.herokuapp.com/api/attp?text='+ text +'&apikey=alpin1'
  data = await fetch(hasil).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/attp.gif', data)
  res.sendFile(__path +'/tmp/attp.gif')
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/maker/harta-tahta', async(req, res, next) => {
  const text = req.query.text;
  const apikey = req.query.apikey;
  
  if(!text) return res.json(loghandler.nottext)
  if(!apikey) return res.json(loghandler.notparam)
  
  if(listkey.includes(apikey)) {
  let hasil = 'https://api.zeks.xyz/api/hartatahta?text='+ text +'&apikey=apivinz' 
  data = await fetch(hasil).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/tahta.jpg', data)
  res.sendFile(__path +'/tmp/tahta.jpg')
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/maker/skatch', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  if(!url) return res.json(loghandler.noturl)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  let hasil = `https://lindow-api.herokuapp.com/api/sketcheffect?img=${url}&apikey=LindowApi`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/skatch.jpeg', data)
        res.sendFile(__path+'/tmp/skatch.jpeg')
  } else {
    res.json(loghandler.invalidKey)
  }
});
router.get('/maker/tololserti', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  if(!text) return res.json(loghandler.noturl)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  let hasil = `https://lolhuman.herokuapp.com/api/toloserti?apikey=muzharzain&name=${text}`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/tololserti.jpeg', data)
        res.sendFile(__path+'/tmp/tololserti.jpeg')
  } else {
    res.json(loghandler.invalidKey)
  }
});
router.get('/maker/emoji2png', async(req, res, next) => {
  const apikey = req.query.apikey;
  const Emoji = req.query.text;
  
  if(!apikey) return jes.json(loghandler.notparam)
  if(!Emoji) return res.json(loghandler.nottext)
  
  if(listkey.includes(apikey)) {

    emoji.get(Emoji)
    .then(img_emoji => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: img_emoji.images[0].url
      }
      res.json(result)
    })
  
    .catch((err) => {
      res.json(loghandler.error)
    })
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/web2plain-text', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  
  if(!url) return res.json(loghandler.noturl)
  if(!apikey) return res.json(loghandler.notparam)
  
  if(listkey.includes(apikey)){
    fetch(encodeURI(`https://websitetextextraction.apifex.com/api/v1/extract?url=${url}`))
    .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
               status: true,
               code: 200,
               creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
  } else {
    res.json(loghandler.invalidKey)
  }
});


router.get('/cekapikey', async(req, res, next) => {
  const apikey = req.query.apikey;
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)) {
    res.json({
      status: 'active',
      creator: `${creator}`,
      apikey: `${apikey}`,
      message: 'APIKEY ACTIVE'
    })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.use(function (req, res) {

    res.status(404)
    .set("Content-Type", "text/html")
    .sendFile(__path + '/views/404.html');
});

router.get('/wallpaper/cyberspace', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/CyberSpace.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/wallpaper/teknologi', async (req, res, next) => {
        const Apikey = req.query.apikey;
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/Technology.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/wallpaper/muslim', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/Islamic.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/wallpaper/programming', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/Programming.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/wallpaper/pegunungan', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/Mountain.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/wallpaper/anony', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/binjaicity/warga62/master/anony.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/wallpaper/joker', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/binjaicity/warga62/master/joker.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/wallpaper/hijaber', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/binjaicity/warga62/master/hijaber.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/wallpaper/cecans', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/binjaicity/warga62/master/cecan.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/wallpaper/cogans', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://api.fdci.se/rep.php?gambar=cowokganteng`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/wallpaper/harley', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/binjaicity/warga62/master/harley.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/cekapikey', async(req, res, next) => {
  const apikey = req.query.apikey;
  if(!apikey) return res.sendFile(invalidKey)
  if(listkey.includes(apikey)) {
    res.json({
      status: 'active',
      creator: `${creator}`,
      apikey: `${apikey}`,
      message: 'active period 22hari'
    })
  } else {
    res.sendFile(invalidKey)
  }
})

router.get('/muslim/niatshalat', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataNiatShalat.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/muslim/tahlil', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataTahlil.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/muslim/wirid', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataWirid.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/muslim/ayatkursi', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataAyatKursi.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/muslim/doaharian', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataDoaHarian.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/muslim/bacaanshalat', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataBacaanShalat.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/muslim/jadwalshalat', async (req, res, next) => {
        var Apikey = req.query.apikey,
            kota = req.query.kota
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!kota) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kota"})

       fetch(encodeURI(`https://zahirr-web.herokuapp.com/api/jadwalshalat?kota=${kota}&apikey=zahirgans`))
        .then(response => response.json())
        .then(data => {
        var result = data.data;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get("/kisahnabi", (req, res) => {
    const nabi = req.query.nabi;
    const apikey = req.query.apikey;
    
    if(!nabi) return res.send(loghandler.notquery)
    if(!apikey) return res.send(loghandler.notparam)
    if(listkey.includes(apikey)){
    Searchnabi(nabi)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.send(error);
        });
      } else {
      res.send(loghandler.invalidKey)
      }
});

router.get('/asupan', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/binjaicity/warga62/master/asupan.js`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/rikagusriani', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/binjaicity/warga62/master/asupan/rikagusriani.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/asupan/santuy', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/binjaicity/warga62/master/santuy.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/ukty', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/binjaicity/warga62/master/ukhty.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/bocil', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/binjaicity/warga62/master/bocil.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/ghea', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/binjaicity/warga62/master/geayubi.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/ass', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/ass.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/ahegao', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/ahegao.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/bdsm', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/bdsm.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/blowjob', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/blowjob.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/cuckold', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/cuckold.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/cum', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/cum.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/ero', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/ero.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/femdom', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/femdom.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/foot', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/foot.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/gangbang', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/gangbang.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/glasses', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/glasses.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/hentai', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/hentai.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/hentaigif', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/hnt_gifs.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/jahy', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/jahy.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/masturbation', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/masturbation.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/neko', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/nsfwNeko.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/orgy', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/orgy.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/panties', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/panties.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/pussy', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/pussy.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/thighs', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/thighs.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nsfw/yuri', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/yuri.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/serti/tolol', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://tolol.ibnux.com/img.php?nama=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/kodepos', async (req, res, next) => {
        var Apikey = req.query.apikey,
            query = req.query.query
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kode pos"})

       fetch(encodeURI(`https://kodepos-api-zhirrr.vercel.app/?q=${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/lirik', async (req, res, next) => {
        var Apikey = req.query.apikey,
            judul = req.query.judul
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!judul) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter judul"})

       fetch(encodeURI(`https://scrap.terhambar.com/lirik?word=${judul}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nama/ninja', async (req, res, next) => {
        var Apikey = req.query.apikey,
            nama = req.query.nama
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})

       fetch(encodeURI(`https://api.terhambar.com/ninja?nama=${nama}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result: data.result.ninja,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/chord', async (req, res, next) => {
        var Apikey = req.query.apikey,
            judul = req.query.judul
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!judul) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter judul"})

       fetch(encodeURI(`https://hadi-api.herokuapp.com/api/chord?q=${judul}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/text/alay', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

       fetch(encodeURI(`https://api.terhambar.com/bpk?kata=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/cerpen', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`http://zekais-api.herokuapp.com/cerpen`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 cerita: data.result.ceritanya,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/infogempa', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://gempa-api-zhirrr.vercel.app/api/gempa`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/infocuaca', async (req, res, next) => {
        var Apikey = req.query.apikey,
            kota = req.query.kota
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!kota) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kota"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/infocuaca?provinsi=${kota}&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
        var result = data.data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/font', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

       fetch(encodeURI(`https://hadi-api.herokuapp.com/api/font2?teks=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/font2', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

       fetch(encodeURI(`https://hadi-api.herokuapp.com/api/font?teks=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/caklontong', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/kuis/main/caklontong.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/tebak/bendera', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/kalakkaro/random/main/kuis/tebakbendera.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/family100', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/kuis/main/family100.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/tebakgambar', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/jepribarus/kuis/main/tebakgambar.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/ytmp4', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`https://mhankbarbar.herokuapp.com/api/ytv?url=${url}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 judul: data.title,
                 size: data.filesize,
                 resolution: data.resolution,
                 thumb: data.thumb,
                 url_video: data.result,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/ytmp3', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`https://mhankbarbar.herokuapp.com/api/yta?url=${url}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 judul: data.title,
                 size: data.filesize,
                 file: data.ext,
                 thumb: data.thumb,
                 url_audio: data.result,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/ytmp4/2', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`https://hadi-api.herokuapp.com/api/ytvideo?url=${url}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 judul: data.result.title,
                 viewer: data.result.viewer,
                 desc: data.result.desc,
                 thumb: data.result.album,
                 url_video: data.result.download_video,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/ytmp3/2', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`https://hadi-api.herokuapp.com/api/ytaudio?url=${url}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 judul: data.result.title,
                 viewer: data.result.viewer,
                 desc: data.result.desc,
                 thumb: data.result.album,
                 url_video: data.result.download_audio,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/play/mp3', async (req, res, next) => {
        var Apikey = req.query.apikey,
            query = req.query.query
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://api-rull.herokuapp.com/api/yt/playmp3?q=${query}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 judul: data.result.title,
                 size: data.filesizeF,
                 desc: data.result.description,
                 source: data.result.url,
                 thumb: data.result.thumbnail,
                 url: data.result.dl_link,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/play/mp4', async (req, res, next) => {
        var Apikey = req.query.apikey,
            query = req.query.query
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://api-rull.herokuapp.com/api/yt/playmp4?q=${query}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 judul: data.result.title,
                 size: data.filesizeF,
                 desc: data.result.description,
                 source: data.result.url,
                 thumb: data.result.thumbnail,
                 url: data.result.dl_link,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/Instagram/stalk', async (req, res, next) => {
        var Apikey = req.query.apikey,
            username = req.query.username
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!username) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter username"})

       fetch(encodeURI(`https://mhankbarbar.herokuapp.com/api/stalk?username=${username}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             res.json({
             	creator: `${creator}`,
                 Username: data.Username,
                 Nama: data.Name,
                 Diikuti: data.Jumlah_Following,
                 Mengikuti: data.Jumlah_Followers,
                 Postingan: data.Jumlah_Post,
                 Pict: data.Profile_pic,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/igdl/video', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`https://videfikri.com/api/igdl/?url=${url}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 username: data.result.username,
                 comment: data.result.comment,
                 like: data.result.likes,
                 caption: data.result.caption,
                 thumb: data.result.thumb,
                 url: data.result.video,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/fb/download', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`https://fb-api-zhirrr.vercel.app/?url=${url}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             res.json({
             	creator: `${creator}`,
                 judul: data.title,
                 url_video: data.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/yt/search', async (req, res, next) => {
        var Apikey = req.query.apikey,
            search = req.query.search
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})

       fetch(encodeURI(`https://videfikri.com/api/ytsearch/?query=${search}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result.data;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/tiktok/dl', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`https://api.vhtear.com/tiktok_no_wm?link=${url}&apikey=${vhtear}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url_video: data.result.video,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/github/stalk', async (req, res, next) => {
        var Apikey = req.query.apikey,
            username = req.query.username
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!username) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter username"})

       fetch(encodeURI(`https://hadi-api.herokuapp.com/api/githubstalk?username=${username}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 follower: data.result.follower,
                 following: data.result.following,
                 location: data.result.location,
                 bio: data.result.bio,
                 type: data.result.Type,
                 public_repo: data.result.public_repo,
                 public_gists: data.result.public_gists,
                 avatar: data.result.avatar,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/twitter/stalk', async (req, res, next) => {
        var Apikey = req.query.apikey,
            username = req.query.username
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!username) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter username"})

       fetch(encodeURI(`https://videfikri.com/api/stalktwit/?username=${username}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 nama: data.result.full_name,
                 username: data.result.username,
                 followers: data.result.followers,
                 following: data.result.following,
                 twitt: data.result.tweets,
                 img_profile: data.result.profile,
                 verified: data.result.verified,
                 listed_count: data.result.listed_count,
                 favourites: data.result.favourites,
                 img_banner: data.result.profile_banner,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/joox', async (req, res, next) => {
        var Apikey = req.query.apikey,
            search = req.query.search
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})

       fetch(encodeURI(`https://mnazria.herokuapp.com/api/jooxnich?search=${search}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 title: data.result.malbum,
                 thumb: data.result.album_url,
                 artist: data.result.msinger,
                 url_mp3: data.result.mp3Url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/download/twitter', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`http://zekais-api.herokuapp.com/twtdl?url=${url}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             res.json({
             	creator: `${creator}`,
                 type: data.type,
                 url_mp4: data.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/mediafire', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`http://zekais-api.herokuapp.com/mediafire?url=${url}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 name: data.result.name,
                 type: data.result.mimetype,
                 size: data.result.size,
                 url_file: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/tinyurl', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`http://hadi-api.herokuapp.com/api/tinyurl?url=${url}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             res.json({
             	creator: `${creator}`,
                 url: data.result,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/bitly', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`http://hadi-api.herokuapp.com/api/bitly?url=${url}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             res.json({
             	creator: `${creator}`,
                 url: data.result,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/shorturl', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`http://hadi-api.herokuapp.com/api/shorturl?url=${url}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             res.json({
             	creator: `${creator}`,
                 url: data.result,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/cuttly', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`http://hadi-api.herokuapp.com/api/cuttly?url=${url}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             res.json({
             	creator: `${creator}`,
                 url: data.result,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/smule', async (req, res, next) => {
        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`https://api.xteam.xyz/dl/smule?url=${url}&APIKEY=${xteam}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
             result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/playstore', async (req, res, next) => {
        var Apikey = req.query.apikey,
            query = req.query.query
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://api.zeks.xyz/api/sgplay?apikey=alpin1234567&q=${query}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
             result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/wikipedia', async (req, res, next) => {
        var Apikey = req.query.apikey,
            query = req.query.query
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://hadi-api.herokuapp.com/api/wiki?query=${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/brainly', async (req, res, next) => {
        var Apikey = req.query.apikey,
            query = req.query.query
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://api.xteam.xyz/brainly?soal=${query}&APIKEY=${xteam}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 soal: data.soal,
                 jawaban: data.jawaban,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/persegi/panjang', async (req, res, next) => {
        var Apikey = req.query.apikey,
            pjg = req.query.pjg
            lbr = req.query.lbr
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!pjg) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter panjang"})
        if(!lbr) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter lebar"})

       fetch(encodeURI(`https://leyscoders-api.herokuapp.com/api/ppanjang?pjg=${pjg}&lebar=${lbr}&apikey=${leys}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             res.json({
             	creator: `${creator}`,
                 rumus_keliling: data.rumus_keliling,
                 hasil_keliling: data.hasil_keliling,
                 rumus_luas: data.rumus_luas,
                 hasil_luas: data.hasil_luas,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/persegi/rumus', async (req, res, next) => {
        var Apikey = req.query.apikey,
            sisi = req.query.sisi
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!sisi) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter sisi"})

       fetch(encodeURI(`https://leyscoders-api.herokuapp.com/api/persegi?sisi=${sisi}&apikey=${leys}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             res.json({
             	creator: `${creator}`,
                 rumus_keliling: data.rumus_keliling,
                 hasil_keliling: data.hasil_keliling,
                 rumus_luas: data.rumus_luas,
                 hasil_luas: data.hasil_luas,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/kubik', async (req, res, next) => {
        var Apikey = req.query.apikey,
            q = req.query.q
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!q) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://leyscoders-api.herokuapp.com/api/bdr/kubik?q=${q}&apikey=${leys}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/kuadrat', async (req, res, next) => {
        var Apikey = req.query.apikey,
            q = req.query.q
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!q) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://leyscoders-api.herokuapp.com/api/bdr/kuadrat?q=${q}&apikey=${leys}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/kbbi', async (req, res, next) => {
        var Apikey = req.query.apikey,
            q = req.query.q
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!q) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${q}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             res.json({
             	creator: `${creator}`,
                 lema: data.lema,
                 arti: data.arti,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/artinama', async (req, res, next) => {
        var Apikey = req.query.apikey,
            nama = req.query.nama
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})

       fetch(encodeURI(`https://api.zeks.xyz/api/artinama?apikey=alpin1234567&nama=${nama}`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 arti: data.result.result,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/artimimpi', async (req, res, next) => {
        var Apikey = req.query.apikey,
            mimpi = req.query.mimpi
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!mimpi) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter mimpi"})

       fetch(encodeURI(`https://api.zeks.xyz/api/artimimpi?apikey=alpin1234567&q=${mimpi}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             res.json({
             	creator: `${creator}`,
                 arti: data.result,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/tahi/lalat', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://leyscoders-api.herokuapp.com/api/tahi-lalat?apikey=OneDayOneCharity`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nama/jawa', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://leyscoders-api.herokuapp.com/api/namajawa?apikey=OneDayOneCharity`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/jam/indo', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://leyscoders-api.herokuapp.com/api/time?apikey=OneDayOneCharity`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/jadwal/bola', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://leyscoders-api.herokuapp.com/api/jadwalbola?apikey=OneDayOneCharity`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/jam/dunia', async (req, res, next) => {
        var Apikey = req.query.apikey,
            kota = req.query.kota
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!kota) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kota"})

       fetch(encodeURI(`https://rest.farzain.com/api/jam.php?id=${kota}&apikey=t7qIB3bmk2Uo8628BRgQjf8WN`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             res.json({
             	creator: `${creator}`,
                 date: data.date,
                 time: data.time,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/jadwal/tv', async (req, res, next) => {
        var Apikey = req.query.apikey,
            chanel = req.query.chanel
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!chanel) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel tv"})

       fetch(encodeURI(`https://api.zeks.xyz/api/jadwaltv?channel=${chanel}&apikey=alpin1234567`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/cinta/segitiga', async (req, res, next) => {
        var Apikey = req.query.apikey,
            nama1 = req.query.nama1
            nama2 = req.query.nama2
            nama3 = req.query.nama3
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!nama1) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama1"})
        if(!nama2) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama2"})
        if(!nama3) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama3"})

       fetch(encodeURI(`https://rest.farzain.com/api/jodoh.php?id=${nama1}-${nama2}-${nama3}&apikey=t7qIB3bmk2Uo8628BRgQjf8WN`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/pinterest', async (req, res, next) => {
        var Apikey = req.query.apikey,
            query = req.query.query
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://api.fdci.se/rep.php?gambar=${query}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/gambar/google', async (req, res, next) => {
        var Apikey = req.query.apikey,
            query = req.query.query
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://api.fdci.se/rep.php?gambar=${query}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/biografi', async (req, res, next) => {
        var Apikey = req.query.apikey,
            tokoh = req.query.tokoh
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!tokoh) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter tokoh"})

       fetch(encodeURI(`https://hadi-api.herokuapp.com/api/wiki?query=${tokoh}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/cek/ip', async (req, res, next) => {
        var Apikey = req.query.apikey,
            ip = req.query.ip
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!ip) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter ip"})

       fetch(encodeURI(`https://hadi-api.herokuapp.com/api/iplookup?ip=${ip}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 country: data.result.country,
                 region: data.result.regionName,
                 city: data.result.city,
                 isp: data.result.isp,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/hilih', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

       fetch(encodeURI(`https://hadi-api.herokuapp.com/api/hilih?teks=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/halah', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

       fetch(encodeURI(`https://hadi-api.herokuapp.com/api/halah?teks=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/heleh', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

       fetch(encodeURI(`https://hadi-api.herokuapp.com/api/heleh?teks=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/huluh', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

       fetch(encodeURI(`https://hadi-api.herokuapp.com/api/huluh?teks=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/translate', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            to = req.query.to
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
        if(!to) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter to"})

       fetch(encodeURI(`http://zekais-api.herokuapp.com/translate?text=${text}&lang=${to}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 origin: data.text,
                 to: data.lang,
                 hasil: data.result,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/bucin', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://api.zeks.xyz/api/pantun?apikey=alpin1234567`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/motivasi', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/kalakkaro/random/main/quetes/motivasi.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/quote/anime', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/akuhantu/anime/main/alpin?token=ATYWGSTAGUEZD374FFLPU43ARSESY`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 quotes: data.result.quote,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/quote/gambar', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://python-jepri.herokuapp.com/api/qanimegr?key=Kagami`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.quote,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/quote/bijak', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/kalakkaro/random/main/quetes/bijak.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/quote/joker', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/kalakkaro/random/main/quetes/joker.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/quote/islami', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/kalakkaro/random/main/quetes/agamis.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/pantun', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/kalakkaro/random/main/quetes/pantun.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/dare', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/kalakkaro/random/main/quetes/dare.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/truth/aneh', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/kalakkaro/random/main/quetes/truhtaneh.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/trut', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/kalakkaro/random/main/quetes/truht.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/caption/dilan', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://xptnewapi.000webhostapp.com/newapixptn/katakatadilan.php?apikey=xptn3`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 dilan: data.result,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/caption/doi', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://xptnewapi.000webhostapp.com/newapixptn/katadoi.php?apikey=xptn3`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/caption/doraemon', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://xptnewapi.000webhostapp.com/newapixptn/katadoraemon.php?apikey=xptn3`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/caption/hits', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://xptnewapi.000webhostapp.com/newapixptn/kataeren.php?apikey=xptn3`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/caption/hacker', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://xptnewapi.000webhostapp.com/newapixptn/katakatahacker.php?apikey=xptn3`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/caption', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://xptnewapi.000webhostapp.com/newapixptn/katastory.php?apikey=xptn3`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/quran', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://api.banghasan.com/quran/format/json/acak`))
        .then(response => response.json())
        .then(data => {
        var result = data.acak;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/cup', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/senja?text=${text}&theme=coffee-cup&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/cup2', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/senja?text=${text}&theme=coffee-cup2&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/glitch', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            text2 = req.query.text2
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})
        if(!text2) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text2"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker?text=${text}&text2=${text2}&theme=glitch&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/google', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            text2 = req.query.text2
            text3 = req.query.text3
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})
        if(!text2) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text2"})
        if(!text3) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text3"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker?text=${text}&text2=${text2}&text3=${text3}&theme=google-suggestion&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/pubg', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            text2 = req.query.text2
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})
        if(!text2) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text2"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/game?text=${text}&text2=${text2}&theme=pubg&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/battlefield', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            text2 = req.query.text2
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})
        if(!text2) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text2"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/game?text=${text}&text2=${text2}&theme=battlefield&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/neon', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/metallic?text=${text}&theme=neon&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/glow', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/metallic?text=${text}&theme=glow&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/summer', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/alam?text=${text}&theme=summer&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/flower', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/alam?text=${text}&theme=flower&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/burn', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/random?text=${text}&theme=text-burn&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/art', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/random?text=${text}&theme=art-quote&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/wooden', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/roses?text=${text}&theme=wooden-boarch&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/golden', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/roses?text=${text}&theme=golden&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/langit', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/barus?text=${text}&theme=langit&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/pot', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/barus?text=${text}&theme=pot&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/romantic', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/apasih?text=${text}&theme=romantic&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/love', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/oaja?text=${text}&theme=love-message&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/under', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/oaja?text=${text}&theme=under-grass&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/wolf', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/ktl?text=${text}&theme=wolf-metal&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/water', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/ktl?text=${text}&theme=underwater-ocean&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/rainbow', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/dugem?text=${text}&theme=glow-rainbow&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/night', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/asw?text=${text}&theme=night-sky&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/fire', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/asw?text=${text}&theme=flaming-text&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/harry', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/ngewe?text=${text}&theme=harry-potter&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/horor', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/ngewe?text=${text}&theme=horor&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/smoke', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/tete?text=${text}&theme=smoke&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/photooxy/between', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel text"})

       fetch(encodeURI(`https://photooxy.herokuapp.com/api/textmaker/tete?text=${text}&theme=between-royal&apikey=kangdev`))
        .then(response => response.json())
        .then(data => {
             var result = data.result;
             res.json({
             	creator: `${creator}`,
                 url: data.result.url,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/blueneon', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/bneon?apikey=apivinz&text=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/matrix', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/matrix?apikey=apivinz&text=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/dropwater', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/dropwater?apikey=apivinz&text=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/wolflogo', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	text2 = req.query.text2
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  if(!text2) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text2"})
  
      hasil = (`https://api.zeks.xyz/api/wolflogo?apikey=apivinz&text1=${text}&text2=${text2}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/blackpink', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/logobp?text=${text}&apikey=apivinz`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/gold', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/gplaybutton?text=${text}&apikey=apivinz`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/silver', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/splaybutton?text=${text}&apikey=apivinz`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/pasir4', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/sandw?apikey=apivinz&text=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/text3d', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/text3dbox?apikey=apivinz&text=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/pornhub', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	text2 = req.query.text2
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  if(!text2) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text2"})
  
      hasil = (`https://api.zeks.xyz/api/phlogo?text1=${text}&text2=${text2}&apikey=apivinz`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/marvel', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	text2 = req.query.text2
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  if(!text2) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text2"})
  
      hasil = (`https://api.zeks.xyz/api/marvellogo?text1=${text}&text2=${text2}&apikey=apivinz`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/light', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/tlight?text=${text}&apikey=apivinz`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/neon', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.xteam.xyz/textpro/neon?text=${text}&APIKEY=${xteam}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/cloud', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.xteam.xyz/textpro/cloudtext?text=${text}&APIKEY=${xteam}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/gradient', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.xteam.xyz/textpro/3dgradient?text=${text}&APIKEY=${xteam}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/vintage', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	text2 = req.query.text2
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  if(!text2) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text2"})
  
      hasil = (`https://api.xteam.xyz/textpro/realisticvintage?text=${text}&text2=${text2}&APIKEY=${xteam}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/pasir2', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.xteam.xyz/textpro/sandsummerbeach?text=${text}&APIKEY=${xteam}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/pasir3', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.xteam.xyz/textpro/sandwriting?text=${text}&APIKEY=${xteam}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/pasir', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.xteam.xyz/textpro/summerysandwriting?text=${text}&APIKEY=${xteam}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/1997', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.xteam.xyz/textpro/1917?text=${text}&APIKEY=${xteam}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/minion', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.xteam.xyz/textpro/minion3d?text=${text}&APIKEY=${xteam}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/helloween', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.xteam.xyz/textpro/helloweenfire?text=${text}&APIKEY=${xteam}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/joker', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.xteam.xyz/textpro/jokerlogo?text=${text}&APIKEY=${xteam}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/lion', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	text2 = req.query.text2
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  if(!text2) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text2"})
  
      hasil = (`https://api.xteam.xyz/textpro/lionlogomascot?text=${text}&text2=${text2}&APIKEY=${xteam}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/party', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.vhtear.com/partytext?text=${text}&apikey=${vhtear}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/glass', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.vhtear.com/wetglass?text=${text}&apikey=${vhtear}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/textpro/grafity', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.vhtear.com/cartoon_graffiti?text=${text}&apikey=${vhtear}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/serti/ff', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://onlydevcity.xyz/FFSerti/img.php?nama=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/serti/ff2', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://onlydevcity.xyz/FFSerti3/img.php?nama=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/serti/ff3', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://onlydevcity.xyz/FFSerti5/img.php?nama=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/serti/ml', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://onlydevcity.xyz/MLTourSerti2/img.php?nama=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/serti/ml2', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://onlydevcity.xyz/MLTourSerti3/img.php?nama=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/serti/ml3', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://onlydevcity.xyz/MLTourSerti5/img.php?nama=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/serti/pubg', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://onlydevcity.xyz/PubgTourSerti2/img.php?nama=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/serti/pubg2', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://onlydevcity.xyz/PubgTourSerti3/img.php?nama=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/serti/pubg3', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://onlydevcity.xyz/PubgTourSerti4/img.php?nama=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nulis2', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    nama = req.query.nama
	kelas = req.query.kelas
	text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!nama) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nama"})
  if(!kelas) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kelas"})
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/magernulis?nama=${nama}&kelas=${kelas}&text=${text}&tinta=1&apikey=apivinz`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nulis', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/nulis?text=${text}&apikey=apivinz`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nulis3', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`http://zekais-api.herokuapp.com/foliokiri?text=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/nulis4', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`http://zekais-api.herokuapp.com/bukukanan?text=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/tahta', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/hartatahta?text=${text}&apikey=apivinz`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/tahta2', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`http://zekais-api.herokuapp.com/hartatahta?text=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/tahta3', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/hartatahta?text=${text}&apikey=alpin1234567`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/tahta4', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://leyscoders-api.herokuapp.com/api/harta-tahta?text=${text}&apikey=${leys}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/ttp', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.xteam.xyz/ttp?file&text=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/attp', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.xteam.xyz/attp?file&text=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/text/naruto', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://hadi-api.herokuapp.com/api/photoxy/manga-naruto?teks=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/slot', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://api.xteam.xyz/game/virtualslot?APIKEY=${xteam}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
             	creator: `${creator}`,
                 slot: data.map,
                 hasil: data.hasil,
                 score: data.score,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/tebak/huruf', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://leyscoders-api.herokuapp.com/api/tebak-kata?apikey=${leys}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/suit', async (req, res, next) => {
        var Apikey = req.query.apikey,
            q = req.query.q
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!q) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter chanel query"})

       fetch(encodeURI(`https://api.xteam.xyz/game/suit?q=batu&APIKEY=${xteam}`))
        .then(response => response.json())
        .then(data => {
             var result = data;
             res.json({
             	creator: `${creator}`,
                 hasil: data.hasil,
                 jawabanmu: data.jawabanmu,
                 jawabanbot: data.jawabanbot,
                 point: data.poin,
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/qkode', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/qrencode?apikey=apivinz&text=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/berkode', async (req, res, next) => {
	var Apikey = req.query.apikey,
	    text = req.query.text
	
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
  if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
  
      hasil = (`https://api.zeks.xyz/api/barcode?apikey=apivinz&text=${text}`)
     data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync('tolol.png', data)
        res.sendFile(__path+'/tolol.png')
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/cari/film', async (req, res, next) => {
        var Apikey = req.query.apikey,
            search = req.query.search
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})

       fetch(encodeURI(`https://lk21-api-zahirr.herokuapp.com/search?query=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
        var result = data.result[Math.floor(Math.random() * data.result.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/film/terbaru', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://lk21-api-zahirr.herokuapp.com/newupload`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
        var result = data[Math.floor(Math.random() * data.length)];
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/tvseries', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://lk21-api-zahirr.herokuapp.com/tv`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/base32/decode', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

       fetch(encodeURI(`https://api.anoncybfakeplayer.com/api/base32/?decode=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result                 
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/base32/encode', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

       fetch(encodeURI(`https://api.anoncybfakeplayer.com/api/base32/?encode=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result                 
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/base62/encode', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

       fetch(encodeURI(`https://api.anoncybfakeplayer.com/api/base64/?encode=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result                                  
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/pencarian/drok', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

       fetch(encodeURI(`https://api-anoncybfakeplayer.herokuapp.com/dorking?dork=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result                                  
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/pastebin', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

       fetch(encodeURI(`https://api-anoncybfakeplayer.herokuapp.com/pastebin?text=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result                                  
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/has', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            type = req.query.type
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})
        if(!type) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter type"})

       fetch(encodeURI(`https://api-anoncybfakeplayer.herokuapp.com/hash?type=${type}&text=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result                                  
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/simi', async (req, res, next) => {
        var Apikey = req.query.apikey,
            text = req.query.text
            
	if(!Apikey) return res.sendFile(invalidKey)
	if(listkey.includes(Apikey)){
        if(!text) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter text"})

       fetch(encodeURI(`https://api.zeks.xyz/api/simi?apikey=alpin1234567&text=${text}`))
        .then(response => response.json())
        .then(data => {
        var result = data.result;
             res.json({
             	creator: `${creator}`,
                 result                                  
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.json(loghandler.invalidKey)
}
})

module.exports = router

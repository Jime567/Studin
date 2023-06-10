const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const DB = require('./database.js');
const cookieParser = require('cookie-parser');

//Service Port
const port = 4000;

//JSON parsing middleware
app.use(express.json());

//cookie parser middleware
app.use(cookieParser());

//static pages I wrote get served
app.use(express.static('public'));

//router for service endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

//create user unless they already exist in DB
app.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.dinID)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.dinID, req.body.password);
    console.log(`Adding ${req.body.dinID} to the Din District`);

    //set a cookie
    setAuthCookies(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

//setting auth token cookie
function setAuthCookies(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  });
}

app.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.dinID);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log(`Authorizing ${req.body.dinID}`);
      setAuthCookies(res, user.token);
      res.send({id: user._id});
      return;
    }
  }
  res.status(401).send({ msg: 'unauthorized'});
});

app.get('/user/me', async (req, res) => {
  authToken = req.cookies['token'];
  const user = await Collection.findOne({token: authToken});
  if (user) {
    res.send({dinID: user.dinID});
    return;
  }
  res.status(401).setDefaultEncoding({msg: 'Unauthorized'});
});

//getEvents
apiRouter.get('/getEvents', async (req, res) => {
  const events = await DB.getEvents();
  res.send(events);
})

//addEvents
apiRouter.post('/addEvent', async (req, res) => {
  DB.addEvent(req.body);
  const events = await DB.getEvents();
  res.send(events);
});

//deleteEvent
apiRouter.delete('/deleteEvent/:eventName', (req, res) => {
  console.log("Purging " + req.params.eventName);
  DB.deleteEvent(req.params.eventName);
  const events =  DB.getEvents();
  res.send(events);
})

//get coordinates endpoints
apiRouter.get('/place/:place', (req, res) => {
    console.log("Betraying the location of " + req.params.place);
    let coords;
    let place = req.params.place;

    switch (place) {
        case "ASB":
          coords = { lat: 40.250824857245874, lng:  -111.64927755654855};
            break;
        case "BELL":
          coords = { lat: 40.252761412186274, lng: -111.64762240171116};
          break;
   
        case "BNSN":
          coords = { lat: 40.24586896927701, lng:  -111.6508383099376};
          break;
        
        case "BRMB":
          coords = { lat: 40.24623490905223, lng: -111.65237182111193};
          break;
    
        case "CONF":
          coords = { lat:40.255532409664, lng: -111.64547388555283 };
          break;
    
        case "CMB":
          coords = { lat: 40.247741636224376, lng:  -111.64448852555843};
          break;
    
        case "CB":
          coords = { lat: 40.24687311012043, lng:   -111.64807181308153};
          break;
    
        case "CTB":
          coords = { lat: 40.247722800018565, lng: -111.64647487811342 };
          break;
    
        case "ELLB":
          coords = { lat: 40.26440202307073, lng: -111.6593800080549 };
          break;
    
        case "EB":
          coords = { lat: 40.24625452143474, lng:  -111.64786965528143};
          break;
    
        case "ERL":
          coords = { lat: 40.24669573978527, lng:  -111.64721441068887};
          break;
    
        case "ESC":
          coords = { lat: 40.24716533122803, lng: -111.65021120633311 };
          break;
    
        case "FPH":
          coords = { lat: 40.246651162601, lng:  -111.65283932678115};
          break;
        
        case "HBLL":
          coords = { lat: 40.24868444187999, lng: -111.64925743380925 };
          break;
    
        case "HGB":
          coords = { lat: 40.24546776618449, lng:  -111.65247460805786};
          break;
    
        case "HCEB":
          coords = { lat: 40.2561246405846, lng: -111.64543497277728};
          break;
    
        case "HRCB":
          coords = { lat: 40.24767727296692, lng:  -111.6493236435047};
          break;
    
        case "JRCB":
          coords = { lat: 40.24957185932559, lng: -111.64530670122886 };
          break;
    
        case "JKB":
          coords = { lat: 40.250190946236316, lng: -111.64995762731472 };
          break;
    
        case "JFSB":
          coords = { lat: 40.248417871178205, lng: -111.65115735594016 };
          break;
    
        case "JSB":
          coords = { lat: 40.24580692901098, lng:  -111.65150148707157};
          break;
    
        case "KMBL":
          coords = { lat: 40.24754021442173, lng:  -111.65115777802909};
          break;
    
        case "LSB":
          coords = { lat: 40.24502928396082, lng:  -111.6492762023778};
          break;
        
        case "LSGH":
          coords = { lat: 40.245226143163144, lng: -111.6412478244953};
          break;
    
        case "MB":
          coords = { lat: 40.248920780779365, lng: -111.64402887651475};
          break;
    
        case "MSRB":
          coords = {lat: 40.245375765312076, lng: -111.65350044137006};
          break;
    
        case "MCKB":
          coords = { lat: 40.24722118566496, lng: -111.65183467124847 };
          break;
    
        case "NICB":
          coords = { lat: 40.246593851583086, lng: -111.65011919219873  };
          break;
    
        case "RMB":
          coords = { lat: 40.24401341728101, lng:  -111.65034171990622};
          break;
    
        case "ROTC":
          coords = { lat: 40.24796642872128, lng: -111.6439959934627};
          break;
    
        case "RB":
          coords = { lat: 40.2490341828839, lng:  -111.65344926702281};
          break;
    
        case "SNLB":
          coords = { lat: 40.24732142837467, lng: -111.64534737547557 };
          break;
    
        case "SFH":
          coords = { lat: 40.24738048521057, lng: -111.65401518315664};
          break;
    
        case "TMCB":
          coords = { lat: 40.2493986375008, lng: -111.6508130914719};
          break;
        
        case "TNRB":
          coords = { lat: 40.250423141223955, lng: -111.65252418365306};
          break;
    
        case "TLRB":
          coords = { lat: 40.24928458924108, lng: -111.6425856537254 };
          break;
    
        case "UPC":
          coords = { lat: 40.25629151475184, lng: -111.65804473698773 };
          break;
    
        case "WVB":
          coords = { lat: 40.248845724605104, lng: -111.6521576685488};
          break;
    
        case "WSC":
          coords = { lat: 40.24853740959004, lng: -111.64718638854792};
          break;

        }
    res.send(coords);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
const { app, BrowserWindow, ipcMain, shell } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const appServer = require('express')()
const whatServer = require('express')()
const { createProxyMiddleware } = require('http-proxy-middleware')

// appServer.listen(54332)
// whatServer.listen(55555)
// whatServer.get('/', (req, res) => {
//   console.log('---req----')
//   console.log(req.headers)
//   console.log('---res----')
//   // eslint-disable-next-line no-unused-expressions
//   // req.headers['cookies']?.forEach(element => {

//   // })
//   // res.cookie("locale","ko")
//   // res.cookie("_ga","GA1.2.1030344003.1594339617")
//   // res.cookie("_gid","GA1.2.1985143701.1594339617")
//   // res.cookie("_gat","1")
//   // res.cookie("AUTH_A_TOKEN","ST1dsyh6BWElEp2pCFa9ZH7mTftcla")
//   // res.cookie("AUTH_R_TOKEN","rriUDY8aTLUWTe4jl25XuXGgdTBe5N")
//   // res.cookie("wehago_s","325582781716226883726333582604091233590")
//   // res.cookie("h_selected_company_no","26928")
//   // res.cookie("cell_company_no","26928")
//   // res.cookie("h_portal_id","zcvfcat")
//   // res.cookie("h_selected_company_code","biz202003200000084")
//   // res.cookie("h_selected_employee_no","306054")

//   res.send('WHAT SERVER')
// })
// let cookie =
//   'locale=ko; _ga=GA1.2.1030344003.1594339617; _gid=GA1.2.1985143701.1594339617; _gat=1; AUTH_A_TOKEN=ST1dsyh6BWElEp2pCFa9ZH7mTftcla; AUTH_R_TOKEN=rriUDY8aTLUWTe4jl25XuXGgdTBe5N; wehago_s=325582781716226883726333582604091233590; h_selected_company_no=26928; cell_company_no=26928; h_portal_id=zcvfcat; h_selected_company_code=biz202003200000084; h_selected_employee_no=306054; test=FUCKYOU'
// appServer.use(
//   createProxyMiddleware('/', {
//     // target: 'http://localhost:55555/',
//     target: 'http://dev.wehagot.com',
//     changeOrigin: true,
//     // cookieDomainRewrite: { 
//     //   "localhost": 'wehagot.com' ,
//     //   "localhost:54331":'wehagot.com',
//     // },
//     // cookieDomainRewrite: {"localhost":'.wehagot.com','.wehagot.com':"localhost"},
//     // cookiePathRewrite: {"*":''},
//     logLevel:'debug',
//     onProxyReq: (proxyReq, req, res) => {
//       // console.debug('\n💥💥💥 request 💥💥💥')
//       res.cookie('locale', 'ko')
//       res.cookie('_ga', 'GA1.2.1030344003.1594339617')
//       res.cookie('_gid', 'GA1.2.1985143701.1594339617')
//       res.cookie('_gat', '1')
//       res.cookie('AUTH_A_TOKEN', 'ST1dsyh6BWElEp2pCFa9ZH7mTftcla')
//       res.cookie('AUTH_R_TOKEN', 'rriUDY8aTLUWTe4jl25XuXGgdTBe5N')
//       res.cookie('wehago_s', '325582781716226883726333582604091233590')
//       res.cookie('h_selected_company_no', '26928')
//       res.cookie('cell_company_no', '26928')
//       res.cookie('h_portal_id', 'zcvfcat')
//       res.cookie('h_selected_company_code', 'biz202003200000084')
//       res.cookie('h_selected_employee_no', '306054')
//       res.cookie('test', 'SSIBA')
//       proxyReq.setHeader('cookies', cookie)
//       // console.log(proxyReq.getHeaders());
//       // Object.keys(proxyReq.getHeaders()).forEach((key) => {
//       //   console.debug(`${key} : ${proxyReq.getHeader(key)}`)
//       // })
//     },
//     onProxyRes: (proxyRes, req, res) => {
//       Object.keys(proxyRes.headers).forEach(function (key) {
//         res.append(key, proxyRes.headers[key]);
//       });
//       // proxyRes.headers['cookie'] = 'locale=ko; _ga=GA1.2.1030344003.1594339617; _gid=GA1.2.1985143701.1594339617; _gat=1; AUTH_A_TOKEN=ST1dsyh6BWElEp2pCFa9ZH7mTftcla; AUTH_R_TOKEN=rriUDY8aTLUWTe4jl25XuXGgdTBe5N; wehago_s=325582781716226883726333582604091233590; h_selected_company_no=26928; cell_company_no=26928; h_portal_id=zcvfcat; h_selected_company_code=biz202003200000084; h_selected_employee_no=306054; test=FUCKYOU'
//     },
//   }),
// )

let mainWindow

let createWindow = () => {
  mainWindow = new BrowserWindow({
    center: true,
    kiosk: !isDev,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js',
    },
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

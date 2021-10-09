export default (group = 'a') => {
  let page = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
                <title> 팀포크봇 </title>
                <link href="style.css" rel="stylesheet">
              </head>
              <body>
                <div id="app">
                </div>

                <script>
                  window.__group__ = "${group}";
                </script>
                <script src="main.js"></script>
              </body>
              `;

  return page;
}
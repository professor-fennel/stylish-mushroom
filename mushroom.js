let spores = [];
let hyphae = [];
let parent = null;

const mycilCallback = (data) => {
  const groupId = data.id?.split(" ").join();
  if (data) {
    let editedElement = parent
      ? document.getElementById(parent)
      : document.getElementById("spores");
    console.log(data);
    if (data.id) {
      editedElement.innerHTML +=
        "<details id='" +
        groupId +
        "'><summary><p>" +
        data.id +
        " <a href='" +
        data.location +
        "'>(LINK)</a>" +
        "</p>" +
        "</summary>";

      editingSummary = true;
      editedElement = document.getElementById("");
    }
    data.spores.forEach((n) => {
      if (spores.indexOf(n) === -1) {
        spores.push(n);
        document.getElementById(groupId || "spores").innerHTML +=
          "<p><b><i><a href='" + n + "'>" + n + "</a></i></b></p>";
      }
    });
    data.hyphae?.forEach((n) => {
      if (hyphae.indexOf(n) === -1) {
        hyphae.push(n);
        parent = groupId;
        JSONP.request(n);
      }
    });

    if (data.id) document.getElementById("spores").innerHTML += "</details>";
  } else {
    return false;
  }
};

var JSONP = {
  request: (url, data, callback) => {
    var callbackName = Math.random();
    var script = document.createElement("script");
    script.src = url + "?callback=" + callbackName;
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
  },
};

JSONP.request("https://intriguing-sprinkle-ambulance.glitch.me/spores.json");

function isSpore(www) {
  if (www.substring(www.length - 11, www.length) == "spores.json") {
    return true;
  } else {
    return false;
  }
}

forage = () => {
  const query = document.getElementById("search-bar").value;
  const resultsList = document.getElementById("results-area");

  for (let i = 0; i < Math.min(spores.length, 30); i++) {
    fetch(
      `https://bitter-sky-6136.fly.dev/?q=${query} site:${spores[i]}&format=json`
    )
      .then((d) => d.json())
      .then((res) => {
        if (res.results.length) {
          const resultsArr = res.results.map(
            (result) =>
              `<li><a href='${result.href}'>${result.title}</a><br /><p>${result.content}</p></li>`
          );
          resultsList.innerHTML += `<h2>${spores[i]}</h2><ul>`;
          resultsArr.forEach((result) => {
            resultsList.innerHTML += result;
          });
          resultsList.innerHTML += "</ul>";
        }
      });
  }
};

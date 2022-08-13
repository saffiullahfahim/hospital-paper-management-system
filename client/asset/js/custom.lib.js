const d = {
    post(url, data) {
    const form = new FormData();
    for (let x in data) {
      form.append(x, data[x]);
    }
    return fetch(url, {
      method: "POST",
      mode: "cors",
      header: {
        "Content-Type": "application/json",
      },
      body: form,
    }).then((_res) => _res.text());
  },
  get(url) {
    return fetch(url).then((_res) => _res.text());
  },
  readFiles(...files) {
    return new Promise((resolve, reject) => {
      const data = [];
      const _reader = (file) => {
        let reader = new FileReader();
        reader.onload = () => {
          data.push(reader.result);
          if (file == files.length - 1) resolve(data);
          else _reader(++file);
        };
        reader.onerror = reject;
        reader.readAsDataURL(files[file]);
      };
      _reader(0);
    });
  },
  getBlobData64(url) {
    return fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((callback) => {
            let reader = new FileReader();
            reader.onload = function () {
              callback(this.result);
            };
            reader.readAsDataURL(blob);
          })
      );
  },
}

window.d = d;


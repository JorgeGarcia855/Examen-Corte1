$(document).ready(function() {
  $(document).on('click', '#word-button', function() {
    let word = document.getElementById('word-input').value;
    $.ajax({
      type: 'GET',
      url: 'https://api.dictionaryapi.dev/api/v2/entries/en/'+ word,
      dataType: 'json',
      success: function(data) {
        let speechInd = 0, defInd = 0, exInd = 0;
        let speechNum = 1, defNum = 1, exNum = 1;

        let word = data[0].word;
        let phonetic = data[0].phonetic;
        let audio = data[0].phonetics[0].audio;
        let origin = data[0].origin;
        let meanings = data[0].meanings;

        let soundBtn = document.createElement('button')
        soundBtn.innerHTML = "Play Audio";
        soundBtn.value = "Play";
        soundBtn.onclick = function() {
          reproducirAudio(audio);
        }

        $('#content').find('tbody').append('<tr>'
        +'<td>'+word+'</td>'
        +'<td>'+phonetic+'</td>'
        +'<td>'+origin+'</td>'
        +'</tr>');
        $('#content').find('tbody').append(soundBtn)

        for (obj in meanings) {
          let partOfSpeech = meanings[speechInd].partOfSpeech;
          let definition = meanings[defInd].definitions[0].definition;
          let example = meanings[exInd].definitions[0].example;

          $('#meanings').find('tbody').append('<tr>'
          +'<td>'+word+'</td>'
          +'<td>'+speechNum+'. '+partOfSpeech+'</td>'
          +'<td>'+defNum+'. '+definition+'</td>'
          +'<td>'+exNum+'. '+example+'</td>'+
          '</tr>');

          speechInd++;
          speechNum++;
          defInd++;
          defNum++;
          exInd++;
          exNum++;
        }
      }
    });
  });
});

function reproducirAudio(url) {
  let sound = new Audio(url);
  sound.play();
}

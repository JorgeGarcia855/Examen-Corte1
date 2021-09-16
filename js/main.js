$(document).ready(function() {
  $(document).on('click', '#word-button', function() {
    let word = document.getElementById('word-input').value;
    $.ajax({
      type: 'GET',
      url: 'https://api.dictionaryapi.dev/api/v2/entries/en/'+ word,
      dataType: 'json',
      success: function(data) {
        let speechInd = 0, defInd = 0, exInd = 0;
        let word = data[0].word;
        let phonetic = data[0].phonetic;
        let audio = data[0].phonetics[0].audio;
        let origin = data[0].origin;
        let meanings = data[0].meanings

        for (let obj in meanings) {
          let partOfSpeech = meanings[speechInd].partOfSpeech
          console.log(partOfSpeech)
          speechInd++
        }

        for (let obj in meanings) {
          let definition = meanings[defInd].definitions[0].definition
          console.log(definition)
          defInd++
        }
        
        for (let obj in meanings) {
          let example = meanings[exInd].definitions[0].example
          console.log(example)
          exInd++
        }
        
      }
    });
  });
});

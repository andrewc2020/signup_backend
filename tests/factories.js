module.exports.validMeme = function() {
    return {
      name: 'Some name here',
      dank: false,
      repost: false
    };
  };
   
  module.exports.repostMeme = function() {
    return {
      name: 'Some name here',
      dank: false,
      repost: true
    };
  }; 


  module.exports.Accounts = () => {
    return [{
      email: "maryGaylord@somewhere.com",
      title: "Ms",
    firstName: "Mary",
    lastName: "Gaylord",
    acceptTerms: true,
    },
    {
      email: "rmurdock@newsinternational.com",
      title: "Mr",
    firstName: "Rupert",
    lastName: "Murdock",
    acceptTerms: true,
    }


    ]
  }
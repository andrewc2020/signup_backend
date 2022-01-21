const validMeme = function() {
    return {
      name: 'Some name here',
      dank: false,
      repost: false
    };
  };
   
  const repostMeme = function() {
    return {
      name: 'Some name here',
      dank: false,
      repost: true
    };
  }; 


  const Accounts = () => {
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

  export {
    validMeme,
    repostMeme,
    Accounts,
    

  }
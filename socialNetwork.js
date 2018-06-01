let data = require('./data');

//List everyone and for each of them, list the names of who they follow and who follows them
listFollowAndFollowers = () => {
  for(let key in data) {
    //list the name
    console.log(data[key].name);
    //list the names of who they follow
    console.log("Follows: ", follows(key));
    //list the names of who follows them
    console.log("Followers: ", followers(key));
  }
};
//Identify who follows the most people
mostFollowed = () => {
  let count = 0;
  let name = '';
  //check the length of the follows array
  for(let item in data) {
    if (data[item].follows.length > count) {
      count = data[item].follows.length;
      name = data[item].name;
    }
  }
  console.log("The person who follows the most people is: ", name , " with: ", count);
};
//Identify who has the most followers
mostFollowers = () => {
  let overallCount = 0;
  let name = '';
  //loop through all
  for(let item in data) {
    let count = 0;
    if (numberOfFollowers(item) > overallCount) {
      overallCount = numberOfFollowers(item);
      name = getPerson(item);
    }
  }
  console.log("The person who get's followed the most is: ", name, " with: ", overallCount);
}
//number of followers
numberOfFollowers = (item) => {
  let count = 0;
  //look in follows array of all others
  for(let item2 in data) {
    //count how many people follow a person
    data[item2].follows.map((it) => {
      if(it === item) {
        count++;
      }
    })
  }
  return count;
}
//sum of followers of followers
numberOfFollowersOfFollowers = (key) => {
  let count = 0;
  //count who follows a follower
  for(let item in data) {
    data[item].follows.map((it) => {
      if (key === it) {
        count += numberOfFollowers(item);
      }
    })
  }
  return count;
}
//Identify who follows the most people over 30
mostFollowedOver30 = () => {
  let overallCount = 0;
  let name = '';
  //loop through all
  for(let item in data) {
    let count = 0;
    data[item].follows.map((it) => {
      if (data[it].age > 30) {
        count++;
      }
    })
    //check who follows the most over 30
    if (count > overallCount){
      overallCount = count;
      name = getPerson(item);
    }
  }
  console.log("The person who follows the most people over 30 is: ", name , " with: ", overallCount);
}
//Identify who has the most followers over 30
mostFollowersOver30 = () => {
  let overallCount = 0;
  let name = '';
  //loop through all
  for(let item in data) {
    let count = 0;
    //look in follows array of all others
    for(let item2 in data) {
      //count how many people follow a person over 30
      data[item2].follows.map((it) => {
        if(it === item && data[it].age > 30) {
          count++;
        }
      })
    }
    if (count > overallCount) {
      overallCount = count;
      name = getPerson(item);
    }
  }
  console.log("The person who get's followed the most by people over 30 is: ", name, " with: ", overallCount);
}
//List those who follow someone that doesn't follow them back
followsWhoDoesNotFollow = () => {
  let names = '';
  let notFollowedBy = '';

  //loop through all
  for(let item in data) {
    let count = 0;
    //loop through all follows
    data[item].follows.map((it) => {
      let doesFollow = false;
      //check if any of them is not having the item in their follows
      data[it].follows.map((iter) => {
        //console.log("in iter ", item, " and ", iter);
        if(item === iter) {
          doesFollow = true;
        }
      })
      if(!doesFollow) {
        count++;
        //only print out the name once
        if (count === 1) {
          console.log("People that follow someone that doesn't follow them: ", getPerson(item));
        }
        console.log("Not followed by: ", getPerson(it));
      }
    })
  }
}
//List everyone and their reach (sum of # of followers and # of followers of followers)
reach = () => {
  for(let key in data) {
    //list the name
    console.log("Name: ", getPerson(key));
    //number of followers
    console.log("Number of followers: ", numberOfFollowers(key));
    //number of followers of followers
    console.log("Number of followers of followers: ", numberOfFollowersOfFollowers(key));
  }
}

followers = (key) => {
  let followers = '';
  //list the names of who follows them
  for(let item in data) {
    data[item].follows.map((it) => {
      if (key === it) {
        followers += getPerson(item) + ' ';
      }
    })
  }
  return followers;
};

follows = (key) => {
  let follows = '';
  //list the names of who they follow
  data[key].follows.map((item) => {
   follows += getPerson(item) + ' ';
  })
  return follows;
};

getPerson = (key) => {
  for(let item in data) {
    if(key === item) {
      return data[item].name;
    }
  }
};

//listFollowAndFollowers();
//mostFollowed();
//mostFollowers();
//mostFollowedOver30();
//mostFollowersOver30();
//followsWhoDoesNotFollow();
reach();
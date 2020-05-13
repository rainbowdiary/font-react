import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default class List extends Component {
  static propTypes = {
    searchName: PropTypes.string.isRequired
  };

  state = {
    isLoading: false,
    users: []
  };

  //#region
  /*
  {
  "total_count": 9488,
  "incomplete_results": false,
  "items": [
    {
      "login": "aaa",
      "id": 1704,
      "node_id": "MDQ6VXNlcjE3MDQ=",
      "avatar_url": "https://avatars1.githubusercontent.com/u/1704?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaa",
      "html_url": "https://github.com/aaa",
      "followers_url": "https://api.github.com/users/aaa/followers",
      "following_url": "https://api.github.com/users/aaa/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaa/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaa/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaa/subscriptions",
      "organizations_url": "https://api.github.com/users/aaa/orgs",
      "repos_url": "https://api.github.com/users/aaa/repos",
      "events_url": "https://api.github.com/users/aaa/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaa/received_events",
      "type": "User",
      "site_admin": false,
      "score": 376.4092
    },
    {
      "login": "aaaddress1",
      "id": 8559056,
      "node_id": "MDQ6VXNlcjg1NTkwNTY=",
      "avatar_url": "https://avatars1.githubusercontent.com/u/8559056?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaaddress1",
      "html_url": "https://github.com/aaaddress1",
      "followers_url": "https://api.github.com/users/aaaddress1/followers",
      "following_url": "https://api.github.com/users/aaaddress1/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaaddress1/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaaddress1/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaaddress1/subscriptions",
      "organizations_url": "https://api.github.com/users/aaaddress1/orgs",
      "repos_url": "https://api.github.com/users/aaaddress1/repos",
      "events_url": "https://api.github.com/users/aaaddress1/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaaddress1/received_events",
      "type": "User",
      "site_admin": false,
      "score": 89.535706
    },
    {
      "login": "Aaaaaaaty",
      "id": 15126694,
      "node_id": "MDQ6VXNlcjE1MTI2Njk0",
      "avatar_url": "https://avatars0.githubusercontent.com/u/15126694?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Aaaaaaaty",
      "html_url": "https://github.com/Aaaaaaaty",
      "followers_url": "https://api.github.com/users/Aaaaaaaty/followers",
      "following_url": "https://api.github.com/users/Aaaaaaaty/following{/other_user}",
      "gists_url": "https://api.github.com/users/Aaaaaaaty/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Aaaaaaaty/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Aaaaaaaty/subscriptions",
      "organizations_url": "https://api.github.com/users/Aaaaaaaty/orgs",
      "repos_url": "https://api.github.com/users/Aaaaaaaty/repos",
      "events_url": "https://api.github.com/users/Aaaaaaaty/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Aaaaaaaty/received_events",
      "type": "User",
      "site_admin": false,
      "score": 86.59673
    },
    {
      "login": "aaalgo",
      "id": 5427210,
      "node_id": "MDQ6VXNlcjU0MjcyMTA=",
      "avatar_url": "https://avatars0.githubusercontent.com/u/5427210?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaalgo",
      "html_url": "https://github.com/aaalgo",
      "followers_url": "https://api.github.com/users/aaalgo/followers",
      "following_url": "https://api.github.com/users/aaalgo/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaalgo/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaalgo/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaalgo/subscriptions",
      "organizations_url": "https://api.github.com/users/aaalgo/orgs",
      "repos_url": "https://api.github.com/users/aaalgo/repos",
      "events_url": "https://api.github.com/users/aaalgo/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaalgo/received_events",
      "type": "User",
      "site_admin": false,
      "score": 80.654526
    },
    {
      "login": "yuanhan1890",
      "id": 15167617,
      "node_id": "MDQ6VXNlcjE1MTY3NjE3",
      "avatar_url": "https://avatars3.githubusercontent.com/u/15167617?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/yuanhan1890",
      "html_url": "https://github.com/yuanhan1890",
      "followers_url": "https://api.github.com/users/yuanhan1890/followers",
      "following_url": "https://api.github.com/users/yuanhan1890/following{/other_user}",
      "gists_url": "https://api.github.com/users/yuanhan1890/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/yuanhan1890/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/yuanhan1890/subscriptions",
      "organizations_url": "https://api.github.com/users/yuanhan1890/orgs",
      "repos_url": "https://api.github.com/users/yuanhan1890/repos",
      "events_url": "https://api.github.com/users/yuanhan1890/events{/privacy}",
      "received_events_url": "https://api.github.com/users/yuanhan1890/received_events",
      "type": "User",
      "site_admin": false,
      "score": 77.90286
    },
    {
      "login": "Mstrodl",
      "id": 6877780,
      "node_id": "MDQ6VXNlcjY4Nzc3ODA=",
      "avatar_url": "https://avatars3.githubusercontent.com/u/6877780?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Mstrodl",
      "html_url": "https://github.com/Mstrodl",
      "followers_url": "https://api.github.com/users/Mstrodl/followers",
      "following_url": "https://api.github.com/users/Mstrodl/following{/other_user}",
      "gists_url": "https://api.github.com/users/Mstrodl/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Mstrodl/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Mstrodl/subscriptions",
      "organizations_url": "https://api.github.com/users/Mstrodl/orgs",
      "repos_url": "https://api.github.com/users/Mstrodl/repos",
      "events_url": "https://api.github.com/users/Mstrodl/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Mstrodl/received_events",
      "type": "User",
      "site_admin": false,
      "score": 76.70143
    },
    {
      "login": "aaaron7",
      "id": 16416236,
      "node_id": "MDQ6VXNlcjE2NDE2MjM2",
      "avatar_url": "https://avatars1.githubusercontent.com/u/16416236?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaaron7",
      "html_url": "https://github.com/aaaron7",
      "followers_url": "https://api.github.com/users/aaaron7/followers",
      "following_url": "https://api.github.com/users/aaaron7/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaaron7/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaaron7/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaaron7/subscriptions",
      "organizations_url": "https://api.github.com/users/aaaron7/orgs",
      "repos_url": "https://api.github.com/users/aaaron7/repos",
      "events_url": "https://api.github.com/users/aaaron7/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaaron7/received_events",
      "type": "User",
      "site_admin": false,
      "score": 75.44127
    },
    {
      "login": "BellyABC123",
      "id": 534047,
      "node_id": "MDQ6VXNlcjUzNDA0Nw==",
      "avatar_url": "https://avatars2.githubusercontent.com/u/534047?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/BellyABC123",
      "html_url": "https://github.com/BellyABC123",
      "followers_url": "https://api.github.com/users/BellyABC123/followers",
      "following_url": "https://api.github.com/users/BellyABC123/following{/other_user}",
      "gists_url": "https://api.github.com/users/BellyABC123/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/BellyABC123/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/BellyABC123/subscriptions",
      "organizations_url": "https://api.github.com/users/BellyABC123/orgs",
      "repos_url": "https://api.github.com/users/BellyABC123/repos",
      "events_url": "https://api.github.com/users/BellyABC123/events{/privacy}",
      "received_events_url": "https://api.github.com/users/BellyABC123/received_events",
      "type": "User",
      "site_admin": false,
      "score": 74.19846
    },
    {
      "login": "Ruviper",
      "id": 38503745,
      "node_id": "MDQ6VXNlcjM4NTAzNzQ1",
      "avatar_url": "https://avatars2.githubusercontent.com/u/38503745?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Ruviper",
      "html_url": "https://github.com/Ruviper",
      "followers_url": "https://api.github.com/users/Ruviper/followers",
      "following_url": "https://api.github.com/users/Ruviper/following{/other_user}",
      "gists_url": "https://api.github.com/users/Ruviper/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Ruviper/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Ruviper/subscriptions",
      "organizations_url": "https://api.github.com/users/Ruviper/orgs",
      "repos_url": "https://api.github.com/users/Ruviper/repos",
      "events_url": "https://api.github.com/users/Ruviper/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Ruviper/received_events",
      "type": "User",
      "site_admin": false,
      "score": 73.554306
    },
    {
      "login": "Aaaaaashu",
      "id": 3678166,
      "node_id": "MDQ6VXNlcjM2NzgxNjY=",
      "avatar_url": "https://avatars0.githubusercontent.com/u/3678166?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Aaaaaashu",
      "html_url": "https://github.com/Aaaaaashu",
      "followers_url": "https://api.github.com/users/Aaaaaashu/followers",
      "following_url": "https://api.github.com/users/Aaaaaashu/following{/other_user}",
      "gists_url": "https://api.github.com/users/Aaaaaashu/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Aaaaaashu/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Aaaaaashu/subscriptions",
      "organizations_url": "https://api.github.com/users/Aaaaaashu/orgs",
      "repos_url": "https://api.github.com/users/Aaaaaashu/repos",
      "events_url": "https://api.github.com/users/Aaaaaashu/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Aaaaaashu/received_events",
      "type": "User",
      "site_admin": false,
      "score": 73.09874
    },
    {
      "login": "Aaaaash",
      "id": 17701805,
      "node_id": "MDQ6VXNlcjE3NzAxODA1",
      "avatar_url": "https://avatars0.githubusercontent.com/u/17701805?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Aaaaash",
      "html_url": "https://github.com/Aaaaash",
      "followers_url": "https://api.github.com/users/Aaaaash/followers",
      "following_url": "https://api.github.com/users/Aaaaash/following{/other_user}",
      "gists_url": "https://api.github.com/users/Aaaaash/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Aaaaash/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Aaaaash/subscriptions",
      "organizations_url": "https://api.github.com/users/Aaaaash/orgs",
      "repos_url": "https://api.github.com/users/Aaaaash/repos",
      "events_url": "https://api.github.com/users/Aaaaash/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Aaaaash/received_events",
      "type": "User",
      "site_admin": false,
      "score": 71.234116
    },
    {
      "login": "aaandrew",
      "id": 5565596,
      "node_id": "MDQ6VXNlcjU1NjU1OTY=",
      "avatar_url": "https://avatars0.githubusercontent.com/u/5565596?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaandrew",
      "html_url": "https://github.com/aaandrew",
      "followers_url": "https://api.github.com/users/aaandrew/followers",
      "following_url": "https://api.github.com/users/aaandrew/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaandrew/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaandrew/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaandrew/subscriptions",
      "organizations_url": "https://api.github.com/users/aaandrew/orgs",
      "repos_url": "https://api.github.com/users/aaandrew/repos",
      "events_url": "https://api.github.com/users/aaandrew/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaandrew/received_events",
      "type": "User",
      "site_admin": false,
      "score": 70.67096
    },
    {
      "login": "Mr-haili",
      "id": 18340560,
      "node_id": "MDQ6VXNlcjE4MzQwNTYw",
      "avatar_url": "https://avatars3.githubusercontent.com/u/18340560?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Mr-haili",
      "html_url": "https://github.com/Mr-haili",
      "followers_url": "https://api.github.com/users/Mr-haili/followers",
      "following_url": "https://api.github.com/users/Mr-haili/following{/other_user}",
      "gists_url": "https://api.github.com/users/Mr-haili/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Mr-haili/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Mr-haili/subscriptions",
      "organizations_url": "https://api.github.com/users/Mr-haili/orgs",
      "repos_url": "https://api.github.com/users/Mr-haili/repos",
      "events_url": "https://api.github.com/users/Mr-haili/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Mr-haili/received_events",
      "type": "User",
      "site_admin": false,
      "score": 70.54388
    },
    {
      "login": "axcs1212",
      "id": 14104175,
      "node_id": "MDQ6VXNlcjE0MTA0MTc1",
      "avatar_url": "https://avatars1.githubusercontent.com/u/14104175?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/axcs1212",
      "html_url": "https://github.com/axcs1212",
      "followers_url": "https://api.github.com/users/axcs1212/followers",
      "following_url": "https://api.github.com/users/axcs1212/following{/other_user}",
      "gists_url": "https://api.github.com/users/axcs1212/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/axcs1212/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/axcs1212/subscriptions",
      "organizations_url": "https://api.github.com/users/axcs1212/orgs",
      "repos_url": "https://api.github.com/users/axcs1212/repos",
      "events_url": "https://api.github.com/users/axcs1212/events{/privacy}",
      "received_events_url": "https://api.github.com/users/axcs1212/received_events",
      "type": "User",
      "site_admin": false,
      "score": 68.25028
    },
    {
      "login": "aaasen",
      "id": 1320603,
      "node_id": "MDQ6VXNlcjEzMjA2MDM=",
      "avatar_url": "https://avatars0.githubusercontent.com/u/1320603?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaasen",
      "html_url": "https://github.com/aaasen",
      "followers_url": "https://api.github.com/users/aaasen/followers",
      "following_url": "https://api.github.com/users/aaasen/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaasen/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaasen/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaasen/subscriptions",
      "organizations_url": "https://api.github.com/users/aaasen/orgs",
      "repos_url": "https://api.github.com/users/aaasen/repos",
      "events_url": "https://api.github.com/users/aaasen/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaasen/received_events",
      "type": "User",
      "site_admin": false,
      "score": 66.69339
    },
    {
      "login": "Aaaaaaron",
      "id": 15643702,
      "node_id": "MDQ6VXNlcjE1NjQzNzAy",
      "avatar_url": "https://avatars3.githubusercontent.com/u/15643702?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Aaaaaaron",
      "html_url": "https://github.com/Aaaaaaron",
      "followers_url": "https://api.github.com/users/Aaaaaaron/followers",
      "following_url": "https://api.github.com/users/Aaaaaaron/following{/other_user}",
      "gists_url": "https://api.github.com/users/Aaaaaaron/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Aaaaaaron/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Aaaaaaron/subscriptions",
      "organizations_url": "https://api.github.com/users/Aaaaaaron/orgs",
      "repos_url": "https://api.github.com/users/Aaaaaaron/repos",
      "events_url": "https://api.github.com/users/Aaaaaaron/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Aaaaaaron/received_events",
      "type": "User",
      "site_admin": false,
      "score": 65.249466
    },
    {
      "login": "aaaliua",
      "id": 5554483,
      "node_id": "MDQ6VXNlcjU1NTQ0ODM=",
      "avatar_url": "https://avatars2.githubusercontent.com/u/5554483?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaaliua",
      "html_url": "https://github.com/aaaliua",
      "followers_url": "https://api.github.com/users/aaaliua/followers",
      "following_url": "https://api.github.com/users/aaaliua/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaaliua/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaaliua/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaaliua/subscriptions",
      "organizations_url": "https://api.github.com/users/aaaliua/orgs",
      "repos_url": "https://api.github.com/users/aaaliua/repos",
      "events_url": "https://api.github.com/users/aaaliua/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaaliua/received_events",
      "type": "User",
      "site_admin": false,
      "score": 65.032555
    },
    {
      "login": "Aaahh",
      "id": 3966556,
      "node_id": "MDQ6VXNlcjM5NjY1NTY=",
      "avatar_url": "https://avatars1.githubusercontent.com/u/3966556?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Aaahh",
      "html_url": "https://github.com/Aaahh",
      "followers_url": "https://api.github.com/users/Aaahh/followers",
      "following_url": "https://api.github.com/users/Aaahh/following{/other_user}",
      "gists_url": "https://api.github.com/users/Aaahh/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Aaahh/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Aaahh/subscriptions",
      "organizations_url": "https://api.github.com/users/Aaahh/orgs",
      "repos_url": "https://api.github.com/users/Aaahh/repos",
      "events_url": "https://api.github.com/users/Aaahh/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Aaahh/received_events",
      "type": "User",
      "site_admin": false,
      "score": 64.59552
    },
    {
      "login": "aaarendt",
      "id": 4993098,
      "node_id": "MDQ6VXNlcjQ5OTMwOTg=",
      "avatar_url": "https://avatars2.githubusercontent.com/u/4993098?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaarendt",
      "html_url": "https://github.com/aaarendt",
      "followers_url": "https://api.github.com/users/aaarendt/followers",
      "following_url": "https://api.github.com/users/aaarendt/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaarendt/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaarendt/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaarendt/subscriptions",
      "organizations_url": "https://api.github.com/users/aaarendt/orgs",
      "repos_url": "https://api.github.com/users/aaarendt/repos",
      "events_url": "https://api.github.com/users/aaarendt/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaarendt/received_events",
      "type": "User",
      "site_admin": false,
      "score": 62.759537
    },
    {
      "login": "limejelly",
      "id": 2135346,
      "node_id": "MDQ6VXNlcjIxMzUzNDY=",
      "avatar_url": "https://avatars2.githubusercontent.com/u/2135346?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/limejelly",
      "html_url": "https://github.com/limejelly",
      "followers_url": "https://api.github.com/users/limejelly/followers",
      "following_url": "https://api.github.com/users/limejelly/following{/other_user}",
      "gists_url": "https://api.github.com/users/limejelly/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/limejelly/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/limejelly/subscriptions",
      "organizations_url": "https://api.github.com/users/limejelly/orgs",
      "repos_url": "https://api.github.com/users/limejelly/repos",
      "events_url": "https://api.github.com/users/limejelly/events{/privacy}",
      "received_events_url": "https://api.github.com/users/limejelly/received_events",
      "type": "User",
      "site_admin": false,
      "score": 62.731354
    },
    {
      "login": "aaaven",
      "id": 15137937,
      "node_id": "MDQ6VXNlcjE1MTM3OTM3",
      "avatar_url": "https://avatars2.githubusercontent.com/u/15137937?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaaven",
      "html_url": "https://github.com/aaaven",
      "followers_url": "https://api.github.com/users/aaaven/followers",
      "following_url": "https://api.github.com/users/aaaven/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaaven/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaaven/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaaven/subscriptions",
      "organizations_url": "https://api.github.com/users/aaaven/orgs",
      "repos_url": "https://api.github.com/users/aaaven/repos",
      "events_url": "https://api.github.com/users/aaaven/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaaven/received_events",
      "type": "User",
      "site_admin": false,
      "score": 61.43959
    },
    {
      "login": "aaamg",
      "id": 52712672,
      "node_id": "MDQ6VXNlcjUyNzEyNjcy",
      "avatar_url": "https://avatars0.githubusercontent.com/u/52712672?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaamg",
      "html_url": "https://github.com/aaamg",
      "followers_url": "https://api.github.com/users/aaamg/followers",
      "following_url": "https://api.github.com/users/aaamg/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaamg/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaamg/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaamg/subscriptions",
      "organizations_url": "https://api.github.com/users/aaamg/orgs",
      "repos_url": "https://api.github.com/users/aaamg/repos",
      "events_url": "https://api.github.com/users/aaamg/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaamg/received_events",
      "type": "User",
      "site_admin": false,
      "score": 61.40857
    },
    {
      "login": "aaam",
      "id": 10148223,
      "node_id": "MDQ6VXNlcjEwMTQ4MjIz",
      "avatar_url": "https://avatars2.githubusercontent.com/u/10148223?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaam",
      "html_url": "https://github.com/aaam",
      "followers_url": "https://api.github.com/users/aaam/followers",
      "following_url": "https://api.github.com/users/aaam/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaam/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaam/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaam/subscriptions",
      "organizations_url": "https://api.github.com/users/aaam/orgs",
      "repos_url": "https://api.github.com/users/aaam/repos",
      "events_url": "https://api.github.com/users/aaam/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaam/received_events",
      "type": "User",
      "site_admin": false,
      "score": 60.850014
    },
    {
      "login": "aaaaadrien",
      "id": 7746427,
      "node_id": "MDQ6VXNlcjc3NDY0Mjc=",
      "avatar_url": "https://avatars2.githubusercontent.com/u/7746427?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaaaadrien",
      "html_url": "https://github.com/aaaaadrien",
      "followers_url": "https://api.github.com/users/aaaaadrien/followers",
      "following_url": "https://api.github.com/users/aaaaadrien/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaaaadrien/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaaaadrien/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaaaadrien/subscriptions",
      "organizations_url": "https://api.github.com/users/aaaaadrien/orgs",
      "repos_url": "https://api.github.com/users/aaaaadrien/repos",
      "events_url": "https://api.github.com/users/aaaaadrien/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaaaadrien/received_events",
      "type": "User",
      "site_admin": false,
      "score": 60.593533
    },
    {
      "login": "aaaquants",
      "id": 31335485,
      "node_id": "MDQ6VXNlcjMxMzM1NDg1",
      "avatar_url": "https://avatars0.githubusercontent.com/u/31335485?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaaquants",
      "html_url": "https://github.com/aaaquants",
      "followers_url": "https://api.github.com/users/aaaquants/followers",
      "following_url": "https://api.github.com/users/aaaquants/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaaquants/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaaquants/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaaquants/subscriptions",
      "organizations_url": "https://api.github.com/users/aaaquants/orgs",
      "repos_url": "https://api.github.com/users/aaaquants/repos",
      "events_url": "https://api.github.com/users/aaaquants/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaaquants/received_events",
      "type": "User",
      "site_admin": false,
      "score": 60.491867
    },
    {
      "login": "aaayumi",
      "id": 18599973,
      "node_id": "MDQ6VXNlcjE4NTk5OTcz",
      "avatar_url": "https://avatars1.githubusercontent.com/u/18599973?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaayumi",
      "html_url": "https://github.com/aaayumi",
      "followers_url": "https://api.github.com/users/aaayumi/followers",
      "following_url": "https://api.github.com/users/aaayumi/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaayumi/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaayumi/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaayumi/subscriptions",
      "organizations_url": "https://api.github.com/users/aaayumi/orgs",
      "repos_url": "https://api.github.com/users/aaayumi/repos",
      "events_url": "https://api.github.com/users/aaayumi/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaayumi/received_events",
      "type": "User",
      "site_admin": false,
      "score": 59.832355
    },
    {
      "login": "aaaaalbert",
      "id": 3806695,
      "node_id": "MDQ6VXNlcjM4MDY2OTU=",
      "avatar_url": "https://avatars3.githubusercontent.com/u/3806695?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaaaalbert",
      "html_url": "https://github.com/aaaaalbert",
      "followers_url": "https://api.github.com/users/aaaaalbert/followers",
      "following_url": "https://api.github.com/users/aaaaalbert/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaaaalbert/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaaaalbert/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaaaalbert/subscriptions",
      "organizations_url": "https://api.github.com/users/aaaaalbert/orgs",
      "repos_url": "https://api.github.com/users/aaaaalbert/repos",
      "events_url": "https://api.github.com/users/aaaaalbert/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaaaalbert/received_events",
      "type": "User",
      "site_admin": false,
      "score": 59.19347
    },
    {
      "login": "aaalaniz",
      "id": 1734140,
      "node_id": "MDQ6VXNlcjE3MzQxNDA=",
      "avatar_url": "https://avatars3.githubusercontent.com/u/1734140?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaalaniz",
      "html_url": "https://github.com/aaalaniz",
      "followers_url": "https://api.github.com/users/aaalaniz/followers",
      "following_url": "https://api.github.com/users/aaalaniz/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaalaniz/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaalaniz/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaalaniz/subscriptions",
      "organizations_url": "https://api.github.com/users/aaalaniz/orgs",
      "repos_url": "https://api.github.com/users/aaalaniz/repos",
      "events_url": "https://api.github.com/users/aaalaniz/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaalaniz/received_events",
      "type": "User",
      "site_admin": false,
      "score": 59.100792
    },
    {
      "login": "AAAAAEXQOSyIpN2JZ0ehUQ",
      "id": 36234074,
      "node_id": "MDQ6VXNlcjM2MjM0MDc0",
      "avatar_url": "https://avatars1.githubusercontent.com/u/36234074?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/AAAAAEXQOSyIpN2JZ0ehUQ",
      "html_url": "https://github.com/AAAAAEXQOSyIpN2JZ0ehUQ",
      "followers_url": "https://api.github.com/users/AAAAAEXQOSyIpN2JZ0ehUQ/followers",
      "following_url": "https://api.github.com/users/AAAAAEXQOSyIpN2JZ0ehUQ/following{/other_user}",
      "gists_url": "https://api.github.com/users/AAAAAEXQOSyIpN2JZ0ehUQ/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/AAAAAEXQOSyIpN2JZ0ehUQ/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/AAAAAEXQOSyIpN2JZ0ehUQ/subscriptions",
      "organizations_url": "https://api.github.com/users/AAAAAEXQOSyIpN2JZ0ehUQ/orgs",
      "repos_url": "https://api.github.com/users/AAAAAEXQOSyIpN2JZ0ehUQ/repos",
      "events_url": "https://api.github.com/users/AAAAAEXQOSyIpN2JZ0ehUQ/events{/privacy}",
      "received_events_url": "https://api.github.com/users/AAAAAEXQOSyIpN2JZ0ehUQ/received_events",
      "type": "User",
      "site_admin": false,
      "score": 57.855324
    },
    {
      "login": "aaana",
      "id": 8086510,
      "node_id": "MDQ6VXNlcjgwODY1MTA=",
      "avatar_url": "https://avatars3.githubusercontent.com/u/8086510?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aaana",
      "html_url": "https://github.com/aaana",
      "followers_url": "https://api.github.com/users/aaana/followers",
      "following_url": "https://api.github.com/users/aaana/following{/other_user}",
      "gists_url": "https://api.github.com/users/aaana/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aaana/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aaana/subscriptions",
      "organizations_url": "https://api.github.com/users/aaana/orgs",
      "repos_url": "https://api.github.com/users/aaana/repos",
      "events_url": "https://api.github.com/users/aaana/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aaana/received_events",
      "type": "User",
      "site_admin": false,
      "score": 56.68502
    }
  ]
}

  */
  //#endregion

  // 在哪里发送ajax请求
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(this.props); // 获取上一次的值
    // 加载loading状态
    this.setState({
      isLoading: true
    });
    
    axios
      .get(`https://api.github.com/search/users?q=${nextProps.searchName}`)
      .then(response => {
        this.setState({
          isLoading: false,
          users: response.data.items.map(user => {
            return {
              login: user.login,
              html_url: user.html_url,
              avatar_url: user.avatar_url
            };
          })
        });
      })
      .catch(error => {
        console.log(error);

        this.setState({
          isLoading: false
        });

        alert("网络错误~");
      });
  }

  render() {
    console.log('list render');
    
    const { isLoading, users } = this.state;

    if (isLoading) {
      return <h1>Loading....</h1>;
    }

    if (!users.length) {
      return <h1>enter name to search</h1>;
    }

    return (
      <div className="row">
        {users.map((user, index) => {
          return (
            <div className="card" key={index}>
              <a href={user.html_url}>
                <img src={user.avatar_url} alt="img" style={{ width: 100 }} />
              </a>
              <p className="card-text">{user.login}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

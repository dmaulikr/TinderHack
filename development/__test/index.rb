#!/usr/bin/env ruby

require 'watir'
require 'watir-webdriver'
require 'watir-dom-wait'
require 'timers'

b = Watir::Browser.new


b.goto 'https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=basic_info,email,public_profile,user_about_me,user_activities,user_birthday,user_education_history,user_friends,user_interests,user_likes,user_location,user_photos,user_relationship_details&response_type=token'


b.text_field(:name => 'email').when_dom_changed(delay: 0.5).set 'henryyp@monkiki.co'
b.text_field(:name => 'pass').set '020803maggie020803'

b.button(text: 'Log In').when_present.click

# b.windows.last.use

fburl = b.url

puts "url: #{fburl}"
puts "api key: #{fburl.scan(/#access_token=(.*?(?=(&|$|\r|")))/).last.first}"

accessToken = fburl.scan(/#access_token=(.*?(?=(&|$|\r|")))/).last.first
b.goto 'http://localhost:8889/tinder?access_token=' + accessToken

timers = Timers::Group.new
every_five_seconds = timers.every(10) { b.refresh }
loop { timers.wait }

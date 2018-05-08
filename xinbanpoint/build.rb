#!/usr/bin/env ruby
#encoding=utf-8
require 'fileutils'
DEPLOY_PATH = "/home/ewhine/deploy/web_apps"
OLD_DEPLOY_PATH = '#{DEPLOY_PATH}.old'

FileUtils.rm_rf OLD_DEPLOY_PATH
FileUtils.mv DEPLOY_PATH, OLD_DEPLOY_PATH
FileUtils.mkdir_p DEPLOY_PATH

mv_cmd = "mv /home/ewhine/ewhine_pkg/* #{DEPLOY_PATH}/"
system mv_cmd

puts "?~[??~V??~L?~H~P?~@~B"
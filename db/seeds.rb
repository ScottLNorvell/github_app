# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'open-uri'
require 'zlib'
require 'yajl'
# require 'pry'

ForkDay.delete_all

yesterday = Time.new.yesterday.strftime('%F')

fork_day = ForkDay.create date: yesterday 

repos = {}
24.times do |hour|
	# gz = open("http://data.githubarchive.org/#{yesterday}-15.json.gz")
	# gz = open("http://data.githubarchive.org/2013-10-31-#{hour}.json.gz")
	gz = File.open("/Users/scottsMac/Documents/ga_wdi/projects/10_week/gh_data_play/2013-10-31-#{hour}.json.gz",'r')
	js = Zlib::GzipReader.new(gz).read
	# gz.close
	# parse event json and work with indiv events
	Yajl::Parser.parse(js) do |event|
	  if event['type'] == 'ForkEvent'
	  	repo = event['repository']
	  	repo_id = repo['id']
			if repos[repo_id]
				repos[repo_id][:forked_today] += 1
			else
				# make a dataset of the values!
				repos[repo_id] = {
					forked_today: 1, 
					name: repo['name'], 
					repo_url: repo['url'], 
					total_forks: repo['forks'],
					language: repo['language']
				}
			end
	  end
	end

end

results = repos.sort_by {|k,v| v[:forked_today]}.reverse[0..100]

p results.first

results.each do |result|
	repository = result[1]
	fork_day.repos << Repo.new(repository) 
end

# binding.pry
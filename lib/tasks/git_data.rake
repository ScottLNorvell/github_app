namespace :git_data do

	desc "Pull Yesterday's data from Github"
	task :go_http => :environment do
		require 'open-uri'
		require 'zlib'
		require 'yajl'
		
		puts "gettin some git data!"

		yesterday = Time.new.yesterday.strftime('%F')
		fork_day = ForkDay.create date: yesterday 

		repos = {}
		24.times do |hour|
			gz = open("http://data.githubarchive.org/#{yesterday}-#{hour}.json.gz")
			js = Zlib::GzipReader.new(gz).read

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
			repository[:value] = repository[:forked_today]
			fork_day.repos << Repo.new(repository) 
		end 
	end

	desc "Pull Yesterday's data from Github"
	task :go => :environment do
		require 'open-uri'
		require 'zlib'
		require 'yajl'
		
		puts "gettin some git data!"

		yesterday = Time.new.yesterday.strftime('%F')
		fork_day = ForkDay.create date: yesterday 

		repos = {}
		24.times do |hour|
			puts "opening yesterday (#{yesterday}) at #{hour}!"

			gz = File.open("/var/www/gh_data/#{yesterday}-#{hour}.json.gz")
			js = Zlib::GzipReader.new(gz).read

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
			puts "parsed yesterday (#{yesterday}) at #{hour}!"
		end

		results = repos.sort_by {|k,v| v[:forked_today]}.reverse[0..100]
		p results.first

		results.each do |result|
			repository = result[1]
			repository[:value] = repository[:forked_today]
			fork_day.repos << Repo.new(repository) 
		end 
	end
end
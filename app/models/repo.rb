class Repo
  include Mongoid::Document
  field :forked_today, type: Integer
  field :name, type: String
  field :repo_url, type: String
  field :total_forks, type: Integer
  field :language, type: String
  field :value, type: Integer

  embedded_in :fork_day
end

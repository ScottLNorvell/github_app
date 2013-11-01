class Repo
  include Mongoid::Document
  field :forked_today, type: Integer
  field :name, type: String
  field :repo_url, type: String
  field :total_forks, type: Integer
  field :language, type: String

  embedded_in :fork_day
end

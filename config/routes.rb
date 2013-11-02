GithubGraph::Application.routes.draw do
  root 'welcome#index'
  get 'get_fork_day/:date' => 'fork_days#get_fork_day'
end

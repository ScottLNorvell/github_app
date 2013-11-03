class WelcomeController < ApplicationController
  def index
  	@forks = ForkDay.all
  end
end

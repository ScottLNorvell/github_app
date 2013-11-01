class ForkDaysController < ApplicationController
  def get_fork_day
  	fork_day = ForkDay.first
  	render json: fork_day
  end
end

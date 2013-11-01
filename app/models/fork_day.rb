class ForkDay
  include Mongoid::Document
  field :date, type: Time

  embeds_many :repos
end

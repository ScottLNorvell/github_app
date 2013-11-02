class ForkDay
  include Mongoid::Document
  field :date, type: String

  embeds_many :repos
end

require 'rails_helper'

RSpec.describe "spells/show", type: :view do
  before(:each) do
    @spell = assign(:spell, Spell.create!(
      :type => "Type",
      :characteristic => "Characteristic"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Type/)
    expect(rendered).to match(/Characteristic/)
  end
end

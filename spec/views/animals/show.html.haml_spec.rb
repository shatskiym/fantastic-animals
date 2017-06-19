require 'rails_helper'

RSpec.describe "animals/show", type: :view do
  before(:each) do
    @animal = assign(:animal, Animal.create!(
      :name => "Name",
      :element => "Element",
      :power_type => "Power Type",
      :life => 2,
      :will => 3
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Element/)
    expect(rendered).to match(/Power Type/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(/3/)
  end
end

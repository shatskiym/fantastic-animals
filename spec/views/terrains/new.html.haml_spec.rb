require 'rails_helper'

RSpec.describe "terrains/new", type: :view do
  before(:each) do
    assign(:terrain, Terrain.new(
      :element => "MyString",
      :difficult => 1
    ))
  end

  it "renders new terrain form" do
    render

    assert_select "form[action=?][method=?]", terrains_path, "post" do

      assert_select "input#terrain_element[name=?]", "terrain[element]"

      assert_select "input#terrain_difficult[name=?]", "terrain[difficult]"
    end
  end
end

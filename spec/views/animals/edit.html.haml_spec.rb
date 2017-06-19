require 'rails_helper'

RSpec.describe "animals/edit", type: :view do
  before(:each) do
    @animal = assign(:animal, Animal.create!(
      :name => "MyString",
      :element => "MyString",
      :power_type => "MyString",
      :life => 1,
      :will => 1
    ))
  end

  it "renders the edit animal form" do
    render

    assert_select "form[action=?][method=?]", animal_path(@animal), "post" do

      assert_select "input#animal_name[name=?]", "animal[name]"

      assert_select "input#animal_element[name=?]", "animal[element]"

      assert_select "input#animal_power_type[name=?]", "animal[power_type]"

      assert_select "input#animal_life[name=?]", "animal[life]"

      assert_select "input#animal_will[name=?]", "animal[will]"
    end
  end
end

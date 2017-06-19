require 'rails_helper'

RSpec.describe "characters/edit", type: :view do
  before(:each) do
    @character = assign(:character, Character.create!(
      :name => "MyString",
      :class => "MyString",
      :power => 1
    ))
  end

  it "renders the edit character form" do
    render

    assert_select "form[action=?][method=?]", character_path(@character), "post" do

      assert_select "input#character_name[name=?]", "character[name]"

      assert_select "input#character_class[name=?]", "character[class]"

      assert_select "input#character_power[name=?]", "character[power]"
    end
  end
end

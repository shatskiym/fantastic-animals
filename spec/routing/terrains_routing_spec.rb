require "rails_helper"

RSpec.describe TerrainsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/terrains").to route_to("terrains#index")
    end

    it "routes to #new" do
      expect(:get => "/terrains/new").to route_to("terrains#new")
    end

    it "routes to #show" do
      expect(:get => "/terrains/1").to route_to("terrains#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/terrains/1/edit").to route_to("terrains#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/terrains").to route_to("terrains#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/terrains/1").to route_to("terrains#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/terrains/1").to route_to("terrains#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/terrains/1").to route_to("terrains#destroy", :id => "1")
    end

  end
end
